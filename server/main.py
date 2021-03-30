#!/usr/bin/env python

from flask import Flask
from authentication import authentication

app = Flask(__name__)
app.config.from_object(__name__)


app.register_blueprint(authentication)
def main():
	app.run(host='0.0.0.0')

if __name__ == "__main__":
	main()
