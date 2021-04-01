from flask import Flask
import pymysql.cursor
from DB_connection import test
app = Flask(__name__)


def run():
	
	app.run(host="0.0.0.0")

if __name__ == "__main__":
	run()
