from flask import Blueprint, current_app as app
from flask_restx import Resource,Api
from flask_mqtt import Mqtt, MQTT_ERR_SUCCESS

import threading
import time
import serial

from http import HTTPStatus

from ..config import SERIAL_PORT, SERIAL_BOUND_SPEED

publisher = Blueprint("publisher",__name__)
publisher_api = Api(publisher)

mqtt = Mqtt(app)


# 1 ) trovare modo per bloccare una misura se un'altra è già in corso 
# oppure, meglio, far inivare sul payload della get (forse diventa post a questo punto)
# un nome/codice della misura in modo da metterla in un topic differente altrimenti 
# collidono sullo stesso topic e non va bene
# 2 ) mi identifico al server MQTT oppure uso il server come proxy ?
# 3 ) la get/post deve fallire se : 1. Il server MQTT non è disponibile
#                                   2. La seriale non è collegata 
@publisher_api.route("/Measure")
class Publisher(Resource):
    
    def get(self):
        
        # deamon = True so rthe program isn't prevent to exit
        t = threading.Thread(target=self.takeMeasure,daemon=True)
        t.start()
        return "starting measurement",HTTPStatus.OK
           
    def takeMeasure(self): # this function is executed by a thread
        
        ser = serial.Serial(SERIAL_PORT,SERIAL_BOUND_SPEED,timeout=1) # controllare eventuali errori   
        ser.flush()
        
        mqtt.publish("prova/provaThread","Start message trasmission",retain=False)
        print("[Flask] Start of the Trasmission")
        
        cont = 1
        while cont:
            if ser.in_waiting > 0:
                line = ser.readline().decode('utf-8').rstrip()
                mqtt.publish("prova/provaThread",line,retain=False)
                if(line == "Stop"):
                    print(f"[Flask] End of Trasmission")
                    mqtt.publish("prova/provaThread","End message tramission",retain=False)
                
                    return 0
        
