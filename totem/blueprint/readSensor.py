from flask import Blueprint, current_app as app
from flask_restx import Resource,Api

import threading
import time
import serial

from http import HTTPStatus
import json

from config import SERIAL_PORT, SERIAL_BOUND_SPEED, MQTT_QOS

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
    
        ser = serial.Serial(SERIAL_PORT,SERIAL_BOUND_SPEED,timeout=1) # controllare eventuali errori   
        ser.flush()
        print("[Flask] Start sensor trasmission")
        
        cont = 1
        while cont:
            if ser.in_waiting > 0:
                line = ser.readline().decode('utf-8').rstrip()
                data = json.loads(line)
                print("json :")
                print(data)
                if(line == "Stop"):
                    print(f"[Flask] End sensor trasmission")
                
                    return 0
        
