import os

# Flask configuration
SECRET_KEY = os.urandom(24)
FLASK_HOST = '0.0.0.0'
 
# Google Authentication configuration
GOOGLE_CLIENT_ID = "844949237967-h0pnqs3orkq4159ngua6s4jp0fdqatl4.apps.googleusercontent.com"

# Serial COnfiguration
SERIAL_PORT = "/dev/ttyUSB0" 
SERIAL_BOUND_SPEED = 9600

# MQTT conifugration
MQTT_BROKER_ID = 1 # questo serve soltanto per prova, dovrà essere il google id
MQTT_USERNAME = "username" # solo prova, da sostituire con username di google
MQTT_PASSWORD = "password" # da sostituire con una generata random dal server e memorizzata

MQTT_BROKER_URL = "192.168.1.202"
MQTT_BROKER_PORT = 1883
MQTT_REFRESH_TIME = 1.0

TOPIC_NAME = "prova"

# DB configuration
DB_HOST_ADDRESS = '82.50.172.4'
DB_USER = 'root'
DB_PASSWORD = 'pwd'
DB_NAME = 'remoteMonitoring'
DB_AUTH_PLUGIN = 'mysql_native_password'

CONNECTION_STRING = "mysql+pymysql://"+DB_USER+":"+DB_PASSWORD+"@"+DB_HOST_ADDRESS+":3306/"+DB_NAME+""
