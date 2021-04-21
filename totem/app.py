from flask import Flask
from flask_restx import Api
from flask_mqtt import Mqtt

from config import SECRET_KEY,TOPIC_NAME,MQTT_BROKER_PORT,MQTT_BROKER_URL,MQTT_REFRESH_TIME,FLASK_HOST

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
    from blueprint.publisher import publisher

app.register_blueprint(auth)
app.register_blueprint(publisher)



if __name__ == "__main__":
    # use_reloader is usefull only in debug mode, and it's a way to reload the code when
    # it changes (like nodemon) but with flask MQTT must be disabled otherwise will fail
    app.run(host=FLASK_HOST,debug=False,use_reloader=False)
