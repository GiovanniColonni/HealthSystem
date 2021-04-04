from flask import Blueprint, request, redirect
from flask import current_app as app
from flask_restx import Api,Resource
from flask_login import LoginManager, current_user, login_required, login_user, logout_user
from oauthlib.oauth2 import WebApplicationClient
import os 
import requests
from http import HTTPStatus

from google_token import * 

from config import GOOGLE_CLIENT_ID

auth = Blueprint('auth',__name__)
api = Api(auth) # likn api up to the BP

login_manager = LoginManager()

client = WebApplicationClient(GOOGLE_CLIENT_ID)

with app.app_context():
    login_manager.init_app(app)

@api.route("/login")
class Authentication(Resource):

    def get(self):
        return "ok",HTTPStatus.OK
    
    def post(self):
        return "ok",HTTPStatus.OK