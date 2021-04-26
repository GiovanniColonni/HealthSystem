from flask import Blueprint, current_app as app
from flask_restx import Resource,Api

import threading
import time
import serial

from http import HTTPStatus
import json

from config import SERIAL_PORT, SERIAL_BOUND_SPEED, SENSOR_HR_THRESHOLD,SENSOR_OPERC_THRESHOLD,SENSOR_PRESSURE_THRESHOLD
readSensor = Blueprint("readSensor",__name__)
readSensor_api = Api(readSensor)


@readSensor_api.route("/Measure")
class Publisher(Resource):
    
    def get(self):
        
        # deamon = True so rthe program isn't prevent to exit
        t = threading.Thread(target=self.takeMeasure,daemon=True)
        t.start()
        return "starting measurement",HTTPStatus.OK
             
    def takeMeasure(self):
        Operc_schema = {
                        "type":"object",
                        "properties":{"Operc":{"type":"number"}}
                       }
        Pressure_schema = {
                           "type":"object",
                           "properties":{"Max":{"type":"number"},"Min":{"type":"number"},"HRate":{"type":"number"}}
                          }
        Hrate_schema = {
            "type":"object",
            "properties":{"HRate":{"type":"number"}
            }

        # prendo i valori di soglia relativi all'utente oppure generali ?
        
        ser = serial.Serial(SERIAL_PORT,SERIAL_BOUND_SPEED,timeout=1) # controllare eventuali errori   
        ser.flush()
        print("[Flask] Start sensor monitoring")
        
        cont = 1
        while cont:
            if ser.in_waiting > 0:
                line = ser.readline().decode('utf-8').rstrip()
                if(line != ""):
                    data = json.loads(line)

                    if("Operc" in data):
                        if(SENSOR_THRESHOLD["Operc"] < data["Operc"]):
                            print("Operc sotto la soglia")

                    else if("Max" in data):
                            if(SENSOR_PRESSURE_THRESHOLD["MaxMax"] > data["Max"] || SENSOR_PRESSURE_THRESHOLD["MinMax"] < data["Max"] ):
                                print("Max pressure fuori dalla soglia")
                            if(SENSOR_PRESSURE_THRESHOLD["Min"] < data["MinMin"] || SENSOR_PRESSURE_THRESHOLD["Min"] > data["MaxMin"] ):
                                print("Min pressure fuori dalla soglia")
                            if(SENSOR_THRESHOLD["MaxHRate"] > data["HRate"] || SENSOR_THRESHOLD["MinHRate"] < data["HRate"] ):
                                print("HRate fuori dalla soglia")
                                           
                    else if("HRate" in data): 
                            if(SENSOR_THRESHOLD["MaxHRate"] > data["HRate"] || SENSOR_THRESHOLD["MinHRate"] < data["HRate"] ):
                                print("HRate fuori dalla soglia")
                            
                if(line == "Stop"):
                    print(f"[Flask] End sensor monitoring")
                    cont = 0
        
        return 0
        
