from flask import Flask
from flask_restx import Api

from config import SECRET_KEY,FLASK_HOST

app = Flask(__name__)
app.config.from_object(__name__)
app.secret_key = SECRET_KEY
app.config['REMEMBER_COOKIE_HTTPONLY'] = True

api = Api(app=app,title="Totem")

with app.app_context() :
    from blueprint.auth import auth
    from blueprint.readSensor import readSensor

app.register_blueprint(auth)
app.register_blueprint(readSensor)


if __name__ == "__main__":
    # use_reloader is usefull only in debug mode, and it's a way to reload the code when
    # it changes (like nodemon) but with flask MQTT must be disabled otherwise will fail
    app.run(host=FLASK_HOST,debug=False,use_reloader=False,ssl_context='adhoc')