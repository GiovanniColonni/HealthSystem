from flask import Flask
from DBConnection import DBConnection

app = Flask(__name__)
dbConn = DBConnection()
dbConn.getAllPatient(5)
def run():
	
	app.run(host="0.0.0.0")

if __name__ == "__main__":
	run()
