from app import app
from config import FLASK_HOST,CERT_PATH, KEY_PATH

# se da problemi ssl :  uwsgi --certfile cert.pem --keyfile key.pem -b 0.0.0.0:5000 hello:app
# o qualcosa del genere
if __name__ == "__main__":
    app.run(host=FLASK_HOST,ssl_context=(CERT_PATH,KEY_PATH))