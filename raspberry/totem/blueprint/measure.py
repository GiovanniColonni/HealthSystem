from flask import Blueprint, current_app as app, request, jsonify, g
from flask_restx import Resource,Api
import sqlite3

import threading
import time
import serial
import datetime

from http import HTTPStatus
import json

from config import LOCAL_DATABASE_PATH,SERIAL_PORT, SERIAL_BOUND_SPEED, SENSOR_HR_THRESHOLD,SENSOR_OPERC_THRESHOLD,SENSOR_PRESSURE_THRESHOLD

measure = Blueprint("measure",__name__)

measure_api = Api(measure)

@measure_api.route("/totem/measure",methods=['GET','POST','DELETE'])
class Measure(Resource):

    def getDbConnection(self):
        return sqlite3.connect(LOCAL_DATABASE_PATH)

    def get(self):
        measure = {"measureValue":"","mtype":"","thReached":"","inProgress":"","dateMeasure":""}
        query_get_measure = "SELECT * FROM Measure WHERE inProgress = 1"

        db = self.getDbConnection()
        
        db_cur = db.cursor()
        row = db_cur.execute(query_get_measure)
        entry = row.fetchone()
        
        if entry == None:
            return "no active measure",HTTPStatus.NO_CONTENT
        

        measure["mtype"] = entry[1]
        measure["thReached"] = entry[2]
        measure["inProgress"] = entry[3]
        measure["dateMeasure"] = entry[4]
        print(entry[6])
        measure["measureValue"] = entry[6] 

        db_cur.close()
        db.close()

        return measure,HTTPStatus.OK

    def post(self):

        query_get_measure = "SELECT * FROM Measure WHERE inProgress = ?"
        params = [1]

        db = self.getDbConnection()
        db_cur = db.cursor()
        row = db_cur.execute(query_get_measure,params)
        entry = row.fetchone()
        if entry != None:
            return "measure in progress",HTTPStatus.NO_CONTENT
        
        thread = threading.Thread(target=takeMeasure,daemon=True)
        thread.start()

        return "starting measurement",HTTPStatus.OK

    def delete(self):

        db_conn = self.getDbConnection()
        db_cur = db_conn.cursor()
        reset_query = "UPDATE Measure SET inProgress = 0"

        db_cur.execute(reset_query)

        db_conn.commit()

        db_cur.close()
        db_conn.close()

        return "OK",HTTPStatus.OK

def takeMeasure():
        
        db = sqlite3.connect(LOCAL_DATABASE_PATH)
        db_cur = db.cursor()
        
        query_start_measure = "INSERT INTO Measure(mtype,thReached,inProgress,dateMeasure,measureValue) VALUES (?,?,?,?,?)"
        # type : c/s thReaced: true=1/false=2 val : measure value inProgress : 1/0
        params = ["type",0,1,datetime.date.today(),""]
        query_insert_measure = "UPDATE Measure SET thReached = ?, measureValue = ? WHERE inProgress = 1"
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
                print(line)
                if(line == "Stop"):
                        db_cur.execute(query_end_measure)
                        db.commit()
                        print(f"[Flask] End sensor monitoring")
                        db_cur.close()
                        db.close()
                        break;

                if(line != ""):
                    
                    try:
                        data = json.loads(line) 
                    except:
                        continue # ricomincia ciclo

                    tr  = 0

                    if("Operc" in data):

                        if(SENSOR_OPERC_THRESHOLD["MinOperc"] >= data["Operc"]):
                            tr= 1
                        
                    elif("Max" in data):
                            tr = 0
                            if(SENSOR_PRESSURE_THRESHOLD["MaxMax"] <= data["Max"] or SENSOR_PRESSURE_THRESHOLD["MinMax"] >= data["Max"] ):
                                tr = 1
                                
                            if(SENSOR_PRESSURE_THRESHOLD["MinMin"] >= data["Min"] or SENSOR_PRESSURE_THRESHOLD["MaxMin"] <= data["Min"] ):
                                tr = 1                                
                                
                            if(SENSOR_HR_THRESHOLD["MaxHRate"] <= data["HRate"] or SENSOR_HR_THRESHOLD["MinHRate"] >= data["HRate"] ):
                                tr = 1
                                      
                    elif("HRate" in data): 
                            if(SENSOR_HR_THRESHOLD["MaxHRate"] <= data["HRate"] or SENSOR_HR_THRESHOLD["MinHRate"] >= data["HRate"] ):
                                tr = 1
                            
                    params = [tr,line] # no json su db            
                    db_cur.execute(query_insert_measure,params)
                    db.commit()
        
        return 0
        
