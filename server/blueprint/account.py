from flask import Blueprint, request, make_response
from flask_restx import Api, Resource
from flask_login import login_required
import json

from db.queries.UpdateQuery import UpdateQuery
from db.queries.InsertQuery import InsertQuery
from db.queries.SelectQuery import SelectQuery

from http import HTTPStatus

account = Blueprint("account", __name__, url_prefix="/api/")
accountApi = Api(account)


@accountApi.route('/account/<string:action>')
class Account(Resource):

    @login_required
    def get(self, action):
        return "", HTTPStatus.NOT_IMPLEMENTED

    @login_required
    def post(self, action):
        u = UpdateQuery()
        i = InsertQuery()
        s = SelectQuery()
        if action == "submitFirstAccess":
            userType = request.form.get("userType")
            id = request.form.get("googleId")
            if userType == "patient":
                cf = request.form.get("cf")
            name = request.form.get("name")
            surname = request.form.get("surname")
            date = request.form.get("birthday")
            cf = request.form.get("cf")
            googleId = request.form.get("googleId")
            print(date)
            print(f"id : {id}")
            if not u.update_user_type(id, userType):
                return "Error", HTTPStatus.INTERNAL_SERVER_ERROR
            if userType == "Patient":
                i.insert_patient(name, surname, "", date, cf, googleId)
            elif userType == "Doctor":
                i.insert_doctor(name, surname, date, googleId)
            return "OK", HTTPStatus.OK
        if action == "insertToken":
            id = request.form.get("googleId")
            pushToken = request.form.get("pushToken")
            # get all pushToken from the googleId
            allPushToken = s.get_push_token(id)
            if allPushToken is None or allPushToken == "":
                allPushToken = pushToken+","
            else:
                if pushToken not in allPushToken:
                    allPushToken = allPushToken + pushToken + ","
            if (not u.update_push_token(id, allPushToken)):
                return "Error", HTTPStatus.INTERNAL_SERVER_ERROR
            return "OK", HTTPStatus.OK
        else:
            print(f"action : {action}")
            return "PAGE NOT FOUND", HTTPStatus.NOT_FOUND