from flask import Flask
from flask_restx import Api
from flask_mqtt import Mqtt

from config import SECRET_KEY,TOPIC_NAME

app = Flask(__name__)
app.config.from_object(__name__)
app.secret_key = SECRET_KEY
app.config['REMEMBER_COOKIE_HTTPONLY'] = True

# MQTT configuration
app.config['MQTT_BROKER_URL'] = "localhost" 
app.config['MQTT_BROKER_PORT'] =  1883
app.config['MQTT_REFRESH_TIME'] = 1.0

api = Api(app=app,title="Health system")

with app.app_context() :
    from blueprint.auth import auth

app.register_blueprint(auth)




if __name__ == "__main__":

    app.run(debug=False)