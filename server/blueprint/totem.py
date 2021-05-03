from flask import Blueprint,request
from flask_restx import Api,Resource

from http import HTTPStatus

totem = Blueprint("totem",__name__)
totemApi = Api(totem)


@totemApi.route("/totem/<string:action>")
class Totem(Resource):

    def get(self,action):
        return "",HTTPStatus.NOT_IMPLEMENTED

    def post(self,action):
        pass