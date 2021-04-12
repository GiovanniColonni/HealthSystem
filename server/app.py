from flask import Flask, g
from flask_restx import Api

from config import SECRET_KEY
from db.queries.DeleteQuery import DeleteQuery
from db.queries.InsertQuery import InsertQuery
from db.queries.SelectQuery import SelectQuery

app = Flask(__name__)
app.config.from_object(__name__)

api = Api(app=app, title="HealthSystem")

app.secret_key = SECRET_KEY
app.config['REMEMBER_COOKIE_HTTPONLY'] = True

# dbConn = DBConnection()

with app.app_context():
    from auth import auth

app.register_blueprint(auth)


@app.teardown_appcontext
def teardown_db(exe):
    db = g.pop('db', None)
    if db is not None:
        # qui chiudere connessione al db
        pass


def start():
    app.run()


if __name__ == "__main__":
    """
    account = InsertQuery()
    user_data = account.create_account("test@gmail.com", "lucaV", "ciao", "patient", 12234)
    account = DeleteQuery()
    user_data = account.delete_account_by_email("test@gmail.com")
    doctor = SelectQuery()
    print(doctor.select_doctor_by_patient(2).email)
    """
    start()
