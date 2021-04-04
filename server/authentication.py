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

def get_google_provider_cfg():
	return requests.get(GOOGLE_DISCOVERY_URL).json()

@authentication.route('/login1',methods=['GET','POST'])
def login1():
	if(request.method=='POST'):
		google_provider_cfg = get_google_provider_cfg()
		authorization_endpoint = google_provider_cfg["authorization_endpoint"] # point to hit for authenticate

		request_uri = client.prepare_request_uri(
		   authorization_endpoint,
		   redirect_uri = "http://127.0.0.1:5000",
		   scope = ["openid","email","profile"]
		)
			
		return redirect(request_uri) 
		#print(request_uri)
		#return request_uri 
@authentication.route('/login',methods=['POST','GET'])
def login():
	print(request)
	id_token = request.form.get('id_token')

	if id_token is None:
		print("NO ID token provided")
		return "NO ID token provided",201 # cambiare in httpstatus.Forbidden

	# convert token into identity
	return "token ok",200


