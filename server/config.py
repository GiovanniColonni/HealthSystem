import os

# Flask constants
SECRET_KEY = os.urandom(24)
FLASK_HOST = "0.0.0.0"
# Google constans
GOOGLE_CLIENT_ID = "844949237967-h0pnqs3orkq4159ngua6s4jp0fdqatl4.apps.googleusercontent.com"
GOOGLE_ANDROID_ID = "844949237967-q118p10ptsdbt2rhf3s3gjru910jcdt4.apps.googleusercontent.com"
GOOGLE_IOS_ID = "844949237967-c1vqt61lrrrc6qnh1b44eq2r4tq8fma7.apps.googleusercontent.com"
# DB constans
DB_HOST_ADDRESS = '79.42.64.83'
DB_USER = 'root'
DB_PASSWORD = 'pwd'
DB_NAME = 'remoteMonitoring'
DB_AUTH_PLUGIN = 'mysql_native_password'

CONNECTION_STRING = "mysql+pymysql://"+DB_USER+":"+DB_PASSWORD+"@"+DB_HOST_ADDRESS+":3306/"+DB_NAME+""
