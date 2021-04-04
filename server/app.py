#!/usr/bin/env python

from flask import Flask
import os

app = Flask(__name__)
app.config.from_object(__name__)
app.secret_key = os.urandom(24) 
app.config['REMEMBER_COOKIE_HTTPONLY']=True

with app.app_context():
	from authentication import authentication


app.register_blueprint(authentication)

def start():
	
	app.run()

if __name__ == "__main__":
	start()
