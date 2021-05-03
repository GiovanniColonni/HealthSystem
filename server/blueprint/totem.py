from flask import Blueprint,request
from flask_restx import Api,Resource

totem = Blueprint("totem",__name__)
totemApi = Api(totem)


@totemApi("/totem/<string:action>")
class Totem(Resource):

    def get(self,action):
        pass
    def post(self.,action):
        pass