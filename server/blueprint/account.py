from flask import Blueprint, request
from flask_restx import Api,Resource
from flask_login import login_required

from db.queries.UpdateQuery import UpdateQuery

from http import HTTPStatus

account = Blueprint("account",__name__)
accountApi = Api(account)

@accountApi.route('/account/<string:action>')
class Account(Resource):
    
    @login_required
    def get(self,action):
        return "",HTTPStatus.NOT_IMPLEMENTED

    @login_required
    def post(self,action):
        u = UpdateQuery()
        if(action == "submitFirstAccess"): 
            userType = request.form.get("userType")
            id = request.form.get("id")
            if(userType == "patient"):
                cf = request.form.get("cf")
            name = request.form.get("name")
            surname = request.form.get("surname")
            date = request.form.get("birthday")
            
            if(not u.update_user_type(id,userType)):
               return "Error",HTTPStatus.INTERNAL_SERVER_ERROR
            # aggiungere dati del paziente/infermiere/dottore
            return "OK",HTTPStatus.OK 

        if(action == "insertToken"):
            
            id = request.form.get("id")
            pushToken = request.form.get("pushToken")
            if(not u.update_push_token(id,pushToken)):
                return "Error",HTTPStatus.INTERNAL_SERVER_ERROR
            return "OK",HTTPStatus.OK 
        else:
            print(f"action : {action}")
            return "PAGE NOT FOUND",HTTPStatus.NOT_FOUND

        