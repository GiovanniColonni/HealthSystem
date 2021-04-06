import os
from flask import Flask, g
from flask_restx import Api,Resource
from config import SECRET_KEY
from DBConnection import DBConnection

app = Flask(__name__)
app.config.from_object(__name__)

api = Api(app=app,title="HealthSystem")

app.secret_key = SECRET_KEY 
app.config['REMEMBER_COOKIE_HTTPONLY']=True

#dbConn = DBConnection()

with app.app_context():
	from auth import auth  


app.register_blueprint(auth)


@app.teardown_appcontext
def teardown_db(exe):
	db = g.pop('db',None)
	if db is not None:
    		# qui chiudere connessione al db
			pass



def start():
	app.run()

if __name__ == "__main__":
	start()
