from flask import Flask
from flask_restx import Api
from flask_mqtt import Mqtt

from config import SECRET_KEY,TOPIC_NAME,MQTT_BROKER_PORT,MQTT_BROKER_URL,MQTT_REFRESH_TIME

app = Flask(__name__)
app.config.from_object(__name__)
app.secret_key = SECRET_KEY
app.config['REMEMBER_COOKIE_HTTPONLY'] = True

# MQTT configuration
app.config['MQTT_BROKER_URL'] = MQTT_BROKER_URL 
app.config['MQTT_BROKER_PORT'] =  MQTT_BROKER_PORT
app.config['MQTT_REFRESH_TIME'] = MQTT_REFRESH_TIME

api = Api(app=app,title="Totem")

with app.app_context() :
    from blueprint.auth import auth

app.register_blueprint(auth)




if __name__ == "__main__":

    app.run(debug=False)