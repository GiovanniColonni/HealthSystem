from flask import Blueprint, request, redirect, g, jsonify
from flask import current_app as app
from flask_restx import Api, Resource, fields

from flask_login import LoginManager, current_user, login_required, login_user, logout_user
from oauthlib.oauth2 import WebApplicationClient
import os
import sys 
import logging

from pyasn1.type.univ import Null
from db.queries.SelectQuery import SelectQuery
import requests
from http import HTTPStatus

from google_token import *

from config import GOOGLE_CLIENT_ID,GOOGLE_ANDROID_ID,GOOGLE_IOS_ID
from UserManager import UserManager

auth = Blueprint('auth', __name__, url_prefix="/api")
apiLogin = Api(auth)  # link api up to the BP

# client = WebApplicationClient(GOOGLE_CLIENT_ID)

user_manager = UserManager()

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.session_protection = 'strong'

## DEBUG

##

with app.app_context():
    login_manager.init_app(app)


# implement the user loader of LoginManager (by flask_login)
# with the actual implementation
@login_manager.user_loader
def user_loader(id):
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
    return user_manager.lookup_user(user_id)


@apiLogin.route("/login", methods=["GET", "POST", "DELETE"])
class CurrentUser(Resource):
    user = apiLogin.model("User", {
        'google_id': fields.Integer(description=""),
        'name': fields.String(description=""),
        'email': fields.String(description=""),
    })

    @login_required
    def get(self,):
        s = SelectQuery()
        account = s.get_user_by_id(current_user.id)
        return jsonify({
            'googleId': account.id,
            'username': account.username,
            'email': account.email,
            'userType': account.userType,
            'pushToken': account.pushToken
        })

    @csrf_protection
    def post(self,):
        # modificare questo in base al tipo di login

        id_token = request.form.get('id_token')
        email = request.form.get('email')
        googleId = request.form.get('googleId')
        username = ""
        ## based on the type of client the verification of the token use different keys
        client_id = ""
        if("type" in request.form):
            
            l_type = request.form.get("type")
            username = request.form.get("name")
            if(l_type=="android"):
                client_id = GOOGLE_ANDROID_ID
            if(l_type=="ios"):
                client_id = GOOGLE_IOS_ID
        
        else:
            client_id = GOOGLE_CLIENT_ID

        if id_token is None:
            return "NO ID token provided", HTTPStatus.FORBIDDEN  # cambiare in httpstatus.Forbidden
        
        identity = {}
        try:
            # call ESP for validating
            if(client_id == GOOGLE_CLIENT_ID):
                identity = validate_id_token(id_token, client_id)
        except ValueError:
            return 'Invalid ID token', HTTPStatus.FORBIDDEN

        if ('sub' not in identity or 'name' not in identity or 'picture' not in identity):
            pass
            #return "Unexcpected authorization response", HTTPStatus.CONTINUE
        
        if(username == ""):
            username = identity["name"]
        
        user = user_manager.insertUserOrNothing(googleId, username, email, "unknown", "")

        if (login_user(user, remember=True) == False):
            return "Error while login", HTTPStatus.INTERNAL_SERVER_ERROR

        return self.get()

    @csrf_protection
    @login_required
    def delete(self):
        logout_user()
        return "", HTTPStatus.NO_CONTENT
