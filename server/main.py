#!/usr/bin/env python

from flask import Flask
from authentication import authentication
import os

app = Flask(__name__)
app.config.from_object(__name__)
app.secret_key = os.urandom(24) # this secret is not used by the app beacause use google secret
# maybe it can be avoided 

app.register_blueprint(authentication)



def main():
	app.run(host='0.0.0.0')

if __name__ == "__main__":
	main()
