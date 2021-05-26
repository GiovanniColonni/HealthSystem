from app import app
from config import FLASK_HOST,CERT_PATH, KEY_PATH

if __name__ == "__main__":
    app.run(host=FLASK_HOST,ssl_context=(CERT_PATH,KEY_PATH))