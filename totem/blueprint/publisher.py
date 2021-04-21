from flask import Blueprint, current_app as app
from flask_restx import Resource,Api
from flask_mqtt import Mqtt, MQTT_ERR_SUCCESS

import threading
import time

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
        t = threading.Thread(target=self.takeMeasure,daemon=True)
        t.start()
        return "starting measurement",HTTPStatus.OK
           
    def takeMeasure(self):
        c = 0
        
        mqtt.publish("prova/provaThread","Start message trasmission",retain=True)
        
        for c in range(256):
        
            time.sleep(1)
            result,mid = mqtt.publish("prova/provaThread",f"messaggio n {c}",retain=True)
        
        mqtt.publish("prova/provaThread","End message trasmission",retain=True)
        
