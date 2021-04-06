import os
from flask import Flask
from flask_restx import Api,Resource
from config import SECRET_KEY

app = Flask(__name__)
app.config.from_object(__name__)

api = Api(app=app,title="HealthSystem")

app.secret_key = SECRET_KEY 
app.config['REMEMBER_COOKIE_HTTPONLY']=True

with app.app_context():
	from auth import auth # 


app.register_blueprint(auth)

def start():
	app.run()

if __name__ == "__main__":
	start()
