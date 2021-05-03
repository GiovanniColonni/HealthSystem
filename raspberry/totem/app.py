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
    #app.run(host=FLASK_HOST,ssl_context='adhoc')
    app.run(host=FLASK_HOST)