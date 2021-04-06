from flask import Blueprint, request, redirect
from flask import current_app as app

from flask_restx import Api,Resource,fields

from flask_login import LoginManager, current_user, login_required, login_user, logout_user
from oauthlib.oauth2 import WebApplicationClient
import os 
import requests
from http import HTTPStatus

from google_token import * 

from config import GOOGLE_CLIENT_ID

auth = Blueprint('auth',__name__)
apiLogin = Api(auth) # likn api up to the BP


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.session_protection = 'strong'

client = WebApplicationClient(GOOGLE_CLIENT_ID)

with app.app_context():
    login_manager.init_app(app)


def csrf_protection(fn):
   def protected(*args):
        if 'X-Requested-With' in request.headers:
            return fn(*args)
        else:
            return "X-Requested-With header missing", HTTPStatus.FORBIDDEN
   return protected


@login_manager.user_loader
def user_loader(user_id):
    return user_manager.lookup_user(user_id)

@apiLogin.route("/login")
class CurrentUser(Resource):

    a_user = apiLogin.model("User",{
        'google_id': fields.Integer(description=""),
        'name': fields.String(description=""),
        'email':fields.String(description="")
    })
    
    @login_required
    def get(self):
        return jsonify({
            'google_id': current_user.id,
            'name': current_user.name,
            'email': current_user.email
        })
    
    @csrf_protection
    def post(self):
        id_token = request.form.get('id_token')
        email = request.form.get('email')
        googleId = request.form.get('googleId')
        
        # controllare parametri

        if id_token is None:
            return "NO ID token provided", HTTPStatus.FORBIDDEN # cambiare in httpstatus.Forbidden

	    # convert token into identity

        try: 
            identity = validate_id_token(id_token, GOOGLE_CLIENT_ID)
        except ValueError:
            return 'Invalid ID token', HTTPStatus.FORBIDDEN

        if('sub' not in identity or 'name' not in identity or 'picture' not in identity):

            return "Unexcpected authorization response", HTTPStatus.FORBIDDEN

        # aggiungere user a database qui
        # attivare sessione user	


        return "Token ok", HTTPStatus.OK


