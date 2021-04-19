import os

# Flask configuration
SECRET_KEY = os.urandom(24)
TOPIC_NAME = "prova"

# Google Authentication configuration
GOOGLE_CLIENT_ID = "844949237967-h0pnqs3orkq4159ngua6s4jp0fdqatl4.apps.googleusercontent.com"


# MQTT conifugration
MQTT_BROKER_URL = "localhost"
MQTT_BROKER_PORT = 1883
MQTT_REFRESH_TIME = 1.0

# DB configuration
DB_HOST_ADDRESS = '82.50.172.4'
DB_USER = 'root'
DB_PASSWORD = 'pwd'
DB_NAME = 'remoteMonitoring'
DB_AUTH_PLUGIN = 'mysql_native_password'

CONNECTION_STRING = "mysql+pymysql://"+DB_USER+":"+DB_PASSWORD+"@"+DB_HOST_ADDRESS+":3306/"+DB_NAME+""