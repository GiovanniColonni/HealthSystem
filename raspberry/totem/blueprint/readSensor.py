from flask import Blueprint, current_app as app, request, jsonify, g
from flask_restx import Resource,Api
import sqlite3

import threading
import time
import serial
import datetime

from http import HTTPStatus
import json

from config import DATABASE_PATH,SERIAL_PORT, SERIAL_BOUND_SPEED, SENSOR_HR_THRESHOLD,SENSOR_OPERC_THRESHOLD,SENSOR_PRESSURE_THRESHOLD

readSensor = Blueprint("readSensor",__name__)



def connect_db():
    return sqlite3.connect(DATABASE_PATH)

@readSensor.route("/totem/measure",methods=['GET','POST'])
def manageSensor():
    
    if request.method == "GET":
        # GET
        measure = {"name":"","measureValue":"","mtype":"","thReached":"","inProgress":"","dateMeasure":""}
        query_get_measure = "SELECT * FROM Measure WHERE inProgress = ?"
        params = [1]
        db = connect_db()
        db_cur = db.cursor()
        
        row = db_cur.execute(query_get_measure,params)
         
        entry = row.fetchone()
        
        if entry == None:
            return "no active measure",HTTPStatus.OK
        

        measure["mtype"] = entry[1]
        measure["thReached"] = entry[2]
        measure["inProgress"] = entry[3]
        measure["dateMeasure"] = entry[4]
        measure["name"] = entry[5]
        measure["measureValue"] = entry[6] 

        db_cur.close()
        db.close()

        return jsonify(measure),HTTPStatus.OK

    if request.method == "POST":
        # POST
        mode = request.form.get("mode") 
        # controllare che non ci sia già una misura attiva

        thread = threading.Thread(target=takeMeasure,daemon=True)
        thread.start()
        measure_in_progress = True

        return "starting measurement",HTTPStatus.OK
        
def takeMeasure():
        
        db = sqlite3.connect(DATABASE_PATH)
        db_cur = db.cursor()
        
        query_start_measure = "INSERT INTO Measure(mtype,thReached,inProgress,dateMeasure,measureValue) VALUES (?,?,?,?,?)"
        # type : c/s thReaced: true=1/false=2 val : measure value inProgress : 1/0
        params = ["type",0,1,datetime.date.today(),""]
        query_insert_measure = "UPDATE Measure SET thReached = ?, measureVlaue = ? WHERE inProgress = 1"
        query_end_measure = "UPDATE Measure SET inProgress = 0"

        db_cur.execute(query_start_measure,params)
        db.commit()
        
        ser = serial.Serial(SERIAL_PORT,SERIAL_BOUND_SPEED,timeout=1)
        ser.flush()
        print("[Flask] Start sensor monitoring")
        # sostituire le print con le post al link per le notifiche
        
        cont = 1
        while cont:
            if ser.in_waiting > 0:
                
                line = ser.readline().decode('utf-8').rstrip()
                
                if(line == "Stop"):
                        db_cur.execute(query_end_measure)
                        db.commit()
                        print(f"[Flask] End sensor monitoring")
                        db_cur.close()
                        db.close()
                        break;

                if(line != ""):
                    data = json.loads(line)
                    tr  = 0

                    if("Operc" in data):

                        if(SENSOR_THRESHOLD["Operc"] < data["Operc"]):
                            tr= 1
                        
                    elif("Max" in data):
                            tr = 0
                            if(SENSOR_PRESSURE_THRESHOLD["MaxMax"] > data["Max"] or SENSOR_PRESSURE_THRESHOLD["MinMax"] < data["Max"] ):
                                tr = 1
                                
                            if(SENSOR_PRESSURE_THRESHOLD["Min"] < data["MinMin"] or SENSOR_PRESSURE_THRESHOLD["Min"] > data["MaxMin"] ):
                                tr = 1                                
                                
                            if(SENSOR_THRESHOLD["MaxHRate"] > data["HRate"] or SENSOR_THRESHOLD["MinHRate"] < data["HRate"] ):
                                tr = 1
                                      
                    elif("HRate" in data): 
                            if(SENSOR_THRESHOLD["MaxHRate"] > data["HRate"] or SENSOR_THRESHOLD["MinHRate"] < data["HRate"] ):
                                tr = 1
                            
                params = [tr,line] # no json su db            
                db_cur.execute(query_insert_measure,params)
                db.commit()
        
        return 0
        
