import sqlalchemy
from flask import Flask, g, request
from flask_restx import Api, Resource
from pony.flask import example
from flask_login import login_required
from config import SECRET_KEY, FLASK_HOST, CERT_PATH, KEY_PATH
from db.queries.InsertQuery import InsertQuery
from db.queries.SelectQuery import SelectQuery

from db.queries.UpdateQuery import UpdateQuery


app = Flask(__name__)
app.config.from_object(__name__)

api = Api(app=app, title="HealthSystem")

app.secret_key = SECRET_KEY
app.config['REMEMBER_COOKIE_HTTPONLY'] = True



with app.app_context():
    from blueprint.auth import auth
    from blueprint.doctor import doctor
    from blueprint.account import account
    from blueprint.totem import totem
    from blueprint.patient import patient

app.register_blueprint(account)
app.register_blueprint(auth)
app.register_blueprint(doctor)
app.register_blueprint(totem)
app.register_blueprint(patient)


if __name__ == "__main__":
    app.run(host=FLASK_HOST,ssl_context=(CERT_PATH,KEY_PATH))
    #app.run(host=FLASK_HOST)