from flask import Flask, g, request
from flask_restx import Api, Resource
from pony.flask import example
from flask_login import login_required
from config import SECRET_KEY

from db.queries.UpdateQuery import UpdateQuery


app = Flask(__name__)
app.config.from_object(__name__)

api = Api(app=app, title="HealthSystem")

app.secret_key = SECRET_KEY
app.config['REMEMBER_COOKIE_HTTPONLY'] = True

# dbConn = DBConnection()

with app.app_context():
    from blueprint.auth import auth
    from blueprint.doctor import doctor

app.register_blueprint(auth)
app.register_blueprint(doctor)


@app.teardown_appcontext
def teardown_db(exe):
    db = g.pop('db', None)
    if db is not None:
        # qui chiudere connessione al db
        pass


def start():
    app.run()

@api.route("/updateType")
class ChangeType(Resource):
    # questo serve soltanto a fare l'update del tipo di user

    @login_required
    def post(self):
        userId = request.form.get("googleId")
        userType = request.form.get("userType")

        print(userId)
        print(userType)
        UpdateQuery.updateUserType(userId)

        return "OK",200         


if __name__ == "__main__":
    """
    account = InsertQuery()
    user_data = account.create_account("test@gmail.com", "lucaV", "ciao", "patient", 12234)
    account = DeleteQuery()
    user_data = account.delete_account_by_email("test@gmail.com")
    doctor = SelectQuery()
    print(doctor.select_doctor_by_patient(2).email)
    doctor = SelectQuery()
    doctor.select_event_by_doctor(6)
    account = UpdateQuery()
    account.updateUserType("1234", "patient")
    """
    start()
