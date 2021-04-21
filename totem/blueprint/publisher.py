from flask import Blueprint, current_app as app
from flask_restx import Resource,Api
from flask_mqtt import Mqtt, MQTT_ERR_SUCCESS

publisher = Blueprint("publisher",__name__)
publisher_api = Api(publisher)

mqtt = Mqtt(app)

# mi identifico al server MQTT oppure uso il server come proxy ?
@publisher_api.route("/Measure")
class Publisher(Resource):
    
    def get(self):
        # una get qui significa che è stata richiesta una misura
        # l'idea è di creare un thead che ascolti la seriale e, dopo lo start dato
        # dalla seriale, ad ogni misura letta,
        # la invia al broker fino a che dalla seriale non riceve lo stop
        result, mid  = mqtt.publish("prova/provaTopic","messaggio",retain=True)
        
        # mid = messagge ID 
        # result = the error / success code 
        if(result == MQTT_ERR_SUCCESS):
            return "ok",200
        else:
            return "not ok",500