import os 

# Flask constants
SECRET_KEY = os.urandom(24)

# Google constans
GOOGLE_CLIENT_ID = "844949237967-h0pnqs3orkq4159ngua6s4jp0fdqatl4.apps.googleusercontent.com"

# DB constans
DB_HOST_ADDRESS = '82.50.172.4'
DB_USER = 'root'
DB_PASSWORD = 'pwd'
DB_NAME = 'remoteMonitoring'
DB_AUTH_PLUGIN = 'mysql_native_password'

CONNECTION_STRING = "mysql+pymysql://"+DB_USER+":"+DB_PASSWORD+"@"+DB_HOST_ADDRESS+":3306/"+DB_NAME+""