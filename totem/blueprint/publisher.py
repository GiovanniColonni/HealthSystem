from flask import blueprints, current_app as app
from flask_restx import Resource,Api

publisher = blueprints("publisher",__name__)
publisher_api = Api(publisher)

@publisher_api.route("/Measure")
class Publisher(Resource):
    
    def get(self):
        # una get qui significa che è stata richiesta una misura
        # l'idea è di creare un thead che ascolti la seriale e ad ogni messaggio letto
        # lo invia al broker fino a che dalla seriale non riceve lo stop
        pass