from flask import Flask
from flask_restx import Api

from config import SECRET_KEY,FLASK_HOST,LOCAL_DATABASE_PATH 
import sqlite3

app = Flask(__name__)
app.config.from_object(__name__)
app.secret_key = SECRET_KEY
app.config['REMEMBER_COOKIE_HTTPONLY'] = True

api = Api(app=app,title="Totem")

with app.app_context() :
    from blueprint.measure import measure

app.register_blueprint(measure)

if __name__ == "__main__":
    #app.run(host=FLASK_HOST,ssl_context='adhoc')
    #prima di tutto metto tutte le vecchie misure del DB in stato di fine (inProgress = 0)
    db_conn = sqlite3.connect(LOCAL_DATABASE_PATH)
    db_cursor = db_conn.cursor()

    reset_query = "UPDATE Measure SET inProgress = 0 where inProgress = 1"

    db_cursor.execute(reset_query)
    
    c_rows = db_cursor.execute("SELECT * from Measure where inProgress = 1")
    rows = c_rows.fetchall()
    print(len(rows))
    db_cursor.close()
    db_conn.close()
    
    app.run(host=FLASK_HOST,port=5001) # rimettere porta standard, 5001 solo test, aggioranre proxy http dopo
