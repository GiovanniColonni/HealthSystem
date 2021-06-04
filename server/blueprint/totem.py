from flask import Blueprint,request
from flask_restx import Api,Resource

from http import HTTPStatus

totem = Blueprint("totem",__name__, url_prefix="/totem")
totemApi = Api(totem)


@totemApi.route("/postMeasure")
class Totem(Resource):

    def get(self,action):
        return "ok",HTTPStatus.OK

    def post(self,action):
        pass