from flask import Flask
from flask_restx import Api

from config import SECRET_KEY,FLASK_HOST

app = Flask(__name__)
app.config.from_object(__name__)
app.secret_key = SECRET_KEY
app.config['REMEMBER_COOKIE_HTTPONLY'] = True

api = Api(app=app,title="Totem",prefix="/totem")

with app.app_context() :
    from blueprint.readSensor import readSensor
    from blueprint.measure import measure

app.register_blueprint(readSensor)
app.register_blueprint(measure)

if __name__ == "__main__":
    #app.run(host=FLASK_HOST,ssl_context='adhoc')
    app.run(host=FLASK_HOST,port=5001) # rimettere porta standard, 5001 solo test
