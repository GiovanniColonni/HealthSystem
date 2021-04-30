from flask import Blueprint, Request
from flask_restx import Api,Resource
from flask_login import login_required

from http import HTTPStatus

account = Blueprint("account",__name__)
accountApi = Api(account)

@accountApi.route("/account/<action>")
class Account(Resource):

    @login_required
    def get(self,action):
        if(action == "updateType"): 
            
            return "OK",HTTPStatus.OK 
        if(action == "insertToken"):
            return "OK",HTTPStatus.OK 
        

    @login_required
    def post(self,action):
        if(action == "updateType"): 
            return "OK",HTTPStatus.OK 
        if(action == "insertToken"):
            return "OK",HTTPStatus.OK 
        