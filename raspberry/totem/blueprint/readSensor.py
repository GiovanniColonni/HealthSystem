from flask import Blueprint, current_app as app, request, jsonify
from flask_restx import Resource,Api

import threading
import time
import serial

from http import HTTPStatus
import json

from config import SERIAL_PORT, SERIAL_BOUND_SPEED, SENSOR_HR_THRESHOLD,SENSOR_OPERC_THRESHOLD,SENSOR_PRESSURE_THRESHOLD

readSensor = Blueprint("readSensor",__name__)
global measure_in_progress
measure_in_progress = False
global measure 
measure = {"name":"","status":""}
thread = None

@readSensor.route("/totem/measure",methods=['GET','POST','DELETE'])
def manageSensor():
    
    
    print(measure_in_progress)
    if request.method == "GET":
        # GET
        if(not measure_in_progress):
            return "",HTTPStatus.NO_CONTENT
        return jsonify(measure),HTTPStatus.OK

    if request.method == "POST":
        # POST
        if(measure_in_progress):
            return "only one measure in place at a time",HTTPStatus.CONFLICT
        mode = request.form.get("mode") 

        # deamon = True so rthe program isn't prevent to exit
        thread = threading.Thread(target=takeMeasure,daemon=True)
        thread.start()
        measure_in_progress = True
        return "starting measurement",HTTPStatus.OK
        
    if request.method == "DELETE":
        if(not measure_in_progress):
            return "",HTTPStatus.NO_CONTENT
        measure_in_progress= False # questo stoppa anche il thread
        measure = {"name":"","status":""}
        pass

def takeMeasure():
        
        global measure_in_progress
        global measure

        ser = serial.Serial(SERIAL_PORT,SERIAL_BOUND_SPEED,timeout=1)
        ser.flush()
        print("[Flask] Start sensor monitoring")
        # sostituire le print con le post al link per le notifiche
        cont = 1
        while cont or measure_in_progress:
            if ser.in_waiting > 0:
                line = ser.readline().decode('utf-8').rstrip()
                if(line != ""):
                    data = json.loads(line)

                    if("Operc" in data):
                        if(SENSOR_THRESHOLD["Operc"] < data["Operc"]):
                            print("Operc sotto la soglia")

                    elif("Max" in data):
                            if(SENSOR_PRESSURE_THRESHOLD["MaxMax"] > data["Max"] or SENSOR_PRESSURE_THRESHOLD["MinMax"] < data["Max"] ):
                                print("Max pressure fuori dalla soglia")
                            if(SENSOR_PRESSURE_THRESHOLD["Min"] < data["MinMin"] or SENSOR_PRESSURE_THRESHOLD["Min"] > data["MaxMin"] ):
                                print("Min pressure fuori dalla soglia")
                            if(SENSOR_THRESHOLD["MaxHRate"] > data["HRate"] or SENSOR_THRESHOLD["MinHRate"] < data["HRate"] ):
                                print("HRate fuori dalla soglia")
                                           
                    elif("HRate" in data): 
                            if(SENSOR_THRESHOLD["MaxHRate"] > data["HRate"] or SENSOR_THRESHOLD["MinHRate"] < data["HRate"] ):
                                print("HRate fuori dalla soglia")
                            
                if(line == "Stop"):
                    print(f"[Flask] End sensor monitoring")
                    cont = 0
        
        return 0
        
