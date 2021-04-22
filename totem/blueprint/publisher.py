from flask import Blueprint, current_app as app
from flask_restx import Resource,Api
from flask_mqtt import Mqtt, MQTT_ERR_SUCCESS

import threading
import time
import serial

from http import HTTPStatus

publisher = Blueprint("publisher",__name__)
publisher_api = Api(publisher)

mqtt = Mqtt(app)


# mi identifico al server MQTT oppure uso il server come proxy ?
@publisher_api.route("/Measure")
class Publisher(Resource):
    
    def get(self):
        
        # deamon = True so rthe program isn't prevent to exit
        '''
        if(MeasurementInProgress == False):
            t = threading.Thread(target=self.takeMeasure,daemon=True)
            t.start()
            return "starting measurement",HTTPStatus.OK
            MeasurementInProgress = True
        else:
            return "measurerement in progress ",HTTPStatus.CONTINUE    
        '''
        # trovare modo per bloccare una misura se un'altra è già in corso 
        # oppure, meglio, far inivare sul payload della get (forse diventa post a questo punto)
        # un nome/codice della misura in modo da metterla in un topic differente altrimenti 
        # collidono sullo stesso topic e non va bene

        t = threading.Thread(target=self.takeMeasure,daemon=True)
        t.start()
        return "starting measurement",HTTPStatus.OK
           
    def takeMeasure(self): # this function is executed by a thread
        # su const config.py
        Port = "/dev/ttyUSB0" 
        BoundSpeed = 9600

        ser = serial.Serial(Port,BoundSpeed,timeout=1)
        ser.flush()


        mqtt.publish("prova/provaThread","Start message trasmission",retain=False)
        cont = 1
        while cont:
            if ser.in_waiting > 0:
                line = ser.readLine().decode('utf-8').rstrip()
                print(line)
                mqtt.publish("prova/provaThread",line,retain=False)
                if(line == "Stop"):
                    print(f"[Flask] End of Trasmission")
                    mqtt.publish("prova/provaThread","End message tramission",retain=False)
                
                    return 0
        
