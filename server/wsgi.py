from app import app
from config import FLASK_HOST

if __name__ == "__main__":
    app.run(host=FLASK_HOST)