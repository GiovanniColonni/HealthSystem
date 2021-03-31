from flask import Blueprint, request
from flask import current_app as app
from flask-login import (LoginManager, current_user, login_required, login_user, logout_user)
from oauthlib.oauth2 import WebApplicationClient
import os 

authentication = Blueprint('auth',__name__)

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID") 
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET") 
GOOGLE_DISCOVERY_URL = (https://accounts.google.com/.well-known/openid-configuration)


# user session managment setup
login_manager = LoginManager()
login_manager.init_app(app)

client = WebApplicationClient(GOOGLE_CLIENT_ID)




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

# once the client authenticate to google and consent the client it will post the client tokens to use for authentication
@authentication.route('/login/callback')
def callback():
	code = request.args.get("code") # this is only the authorization code sent back by Google, now  we need the token by hit token endpoint

	google_provider_cfg = get_google_provider_cfg();
	token_endpoint = google_provider_cfg["token_endpoint"]
	# now oauthlib is used to construct the token reqeust send it,and parse too
	token_url, headers, body = client.prepare_token_request(
		token_endpoint,
		authorization_response = request.url,
		redirect_url = request.base_url,
		code = code
	)

	# send it and take a response possibly
	token_response = request.post(
	token_url,
	headers=headers,
	data = body,
	auth=(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
	)
	# now parse the token
	client.parse_request_body_response(json.dumps(token_response.json())

	userinfo_endpoint = google_provider_cfg["userinfo_endpoint"]
	uri, headers, body = client.add_token(userinfo_endpoint)
	# take the user information provided by google
	userinfo_response = request.get(uri, headers=headers, data=body)

	# now we can take the user information
	if userinfo_response.json().get("email-verified"): # optional field provided by google in order to know if 
	# the email is verified, is another layer of security but it's opnional

		unique_id = userinfo_response.json()["sub"]
		users_email = userinfo_response.json()["email"]
		#picture = useinfo_response.json()["picture"]
		users_name = userinfo_response.json()["given_name"]
	else: # email not verified
		return "Verify your Google email please and try again",400
	# now you can take the user info

	user = User(
		id = unique_id, name = users_name, email=users_email
	)
