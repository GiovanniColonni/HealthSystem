from flask import Blueprint, request
from flask import current_app as app
from flask-login import (LoginManager, current_user, login_required, login_user, logout_user)

authentication = Blueprint('auth',__name__)

GOOGLE_CLIENT_ID = "" # guardare file
GOOGLE_CLIENT_SECRET = ""
GOOGLE_DISCOVERY_URL = (https://accounts.google.com/.well-known/openid-configuration)


def get_google_provider_cfg():
	return requests.get(GOOGLE_DISCOVERY_URL).json()

@authentication.route('/login/',methods=['GET','POST'])
def login():
	if(request.method=='POST'):
		google_provider_cfg = get_google_provider_cfg()
		authorization_endpoint = google_provider_cfg["authorization_endpoint"] # point to hit for authenticate
		
		request_uri = client.prepare_request_uri(
		   authorization_endpoint,
		   redirect_uri = request.base_url + "/callback",
		   scope = ["openid","email","profile"]
		)

		return redirect(request_uri)
	#return render_template('login.html')
	return "Login Get"
