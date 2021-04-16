from flask import Flask
from config import SECRET_KEY
from flask_restx import Api

app = Flask(__name__)
app.config.from_object(__name__)
app.secret_key = SECRET_KEY
app.config['REMEMBER_COOKIE_HTTPONLY'] = True


api = Api(app=app,title="Health system")

with app.app_context() :
    from blueprint.auth import auth

app.register_blueprint(auth)




if __name__ == "__main__":

    app.run(debug=False)