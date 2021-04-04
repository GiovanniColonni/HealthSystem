from flask import Blueprint, request, redirect
from flask import current_app as app
from flask_login import LoginManager, current_user, login_required, login_user, logout_user
from oauthlib.oauth2 import WebApplicationClient
import os 
import requests

authentication = Blueprint('auth',__name__)

GOOGLE_CLIENT_ID = "844949237967-h0pnqs3orkq4159ngua6s4jp0fdqatl4.apps.googleusercontent.com" # usare variabili di ambiente
GOOGLE_CLIENT_SECRET = "opeuYXl_nSVbvYtY0U6LMyfN"
GOOGLE_DISCOVERY_URL = ("https://accounts.google.com/.well-known/openid-configuration")


# user session managment setup
login_manager = LoginManager()

client = WebApplicationClient(GOOGLE_CLIENT_ID)

with app.app_context():
	login_manager.init_app(app)


@authentication.route('/login',methods=['POST','GET'])
def login():
	
	id_token = request.form.get('id_token')
	email = request.form.get('email')
	googleId = request.form.get('googleId')

	if id_token is None:
		print("NO ID token provided")
		return "NO ID token provided",201 # cambiare in httpstatus.Forbidden

	# convert token into identity



	return "token ok",200


