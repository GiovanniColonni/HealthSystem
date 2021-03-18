from flask import Flask

app = Flask(__name__)

def run():
	
	app.run(host="0.0.0.0")

if __name__ == "__main__":
	run()
