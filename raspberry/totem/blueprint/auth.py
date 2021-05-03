from flask import Blueprint, request, redirect, g, jsonify
from flask import current_app as app

from flask_restx import Api,Resource,fields

from flask_login import LoginManager, current_user, login_required, login_user, logout_user
from oauthlib.oauth2 import WebApplicationClient
import os 
import requests
from http import HTTPStatus

from google_token import * 
from DBConnection import DBConnection

from config import GOOGLE_CLIENT_ID
from UserManager import UserManager

auth = Blueprint('auth',__name__)
apiLogin = Api(auth) # link api up to the BP

client = WebApplicationClient(GOOGLE_CLIENT_ID)




user_manager = UserManager()

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.session_protection = 'strong'

with app.app_context():
    login_manager.init_app(app)

# implement the user loader of LoginManager (by flask_login)
@login_manager.user_loader 
def user_loader(id):
    print("prima")
    return user_manager.lookupUser(id)


def csrf_protection(fn):
   def protected(*args):
        if 'X-Requested-With' in request.headers:
            return fn(*args)
        else:
            return "X-Requested-With header missing", HTTPStatus.FORBIDDEN
   return protected

@login_manager.user_loader
def user_loader(user_id):
    print("seconda")
    return user_manager.lookup_user(user_id)

@apiLogin.route("/login")
class CurrentUser(Resource):


    user = apiLogin.model("User",{
        'google_id': fields.Integer(description=""),
        'name': fields.String(description=""),
        'email':fields.String(description="")
    })

    @login_required
    def get(self):
        return jsonify({
            'googleId': current_user.id,
            'username': current_user.username,
            'email': current_user.email,
            'userType': current_user.userType
        })
    
    @csrf_protection
    def post(self):
        id_token = request.form.get('id_token')
        email = request.form.get('email')
        googleId = request.form.get('googleId')
        
        if id_token is None:
            return "NO ID token provided", HTTPStatus.FORBIDDEN # cambiare in httpstatus.Forbidden

        try: 
            # call ESP for validating
            identity = validate_id_token(id_token, GOOGLE_CLIENT_ID)
        except ValueError:
            return 'Invalid ID token', HTTPStatus.FORBIDDEN

        if('sub' not in identity or 'name' not in identity or 'picture' not in identity):

            return "Unexcpected authorization response", HTTPStatus.FORBIDDEN

        username = identity["name"]
        user = user_manager.insertUserOrNothing(googleId,username,email,"fakePass","unknow")

        
        if(login_user(user, remember=True) == False):
            print("login error")
            return "Error while login",HTTPStatus.INTERNAL_SERVER_ERROR

        return self.get()


    