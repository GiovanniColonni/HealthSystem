from flask import Blueprint, request, redirect
from flask import current_app as app
from flask_login import LoginManager, current_user, login_required, login_user, logout_user
from oauthlib.oauth2 import WebApplicationClient
import os 
import requests
from http import HTTPStatus

from google_token import * 

authentication = Blueprint('auth',__name__)



# user session managment setup
login_manager = LoginManager()

GOOGLE_CLIENT_ID = "844949237967-h0pnqs3orkq4159ngua6s4jp0fdqatl4.apps.googleusercontent.com"
client = WebApplicationClient(GOOGLE_CLIENT_ID)

with app.app_context():
	login_manager.init_app(app)


@authentication.route('/login',methods=['POST','GET'])
def login():
	
	id_token = request.form.get('id_token')
	email = request.form.get('email')
	googleId = request.form.get('googleId')

	if id_token is None:
		return "NO ID token provided", HTTPStatus.FORBIDDEN # cambiare in httpstatus.Forbidden

	# convert token into identity

	try: 
		identity = validate_id_token(id_token, "844949237967-h0pnqs3orkq4159ngua6s4jp0fdqatl4.apps.googleusercontent.com")
	except ValueError:
		return 'Invalid ID token', HTTPStatus.FORBIDDEN

	return "token ok", HTTPStatus.OK


