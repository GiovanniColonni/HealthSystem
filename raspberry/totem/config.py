import os

# Flask configuration
SECRET_KEY = os.urandom(24)
FLASK_HOST = '0.0.0.0'
# SQLLITE3 path
DATABASE_PATH = "./db/db.db"
# Google Authentication configuration
GOOGLE_CLIENT_ID = "844949237967-h0pnqs3orkq4159ngua6s4jp0fdqatl4.apps.googleusercontent.com"

# Serial COnfiguration
SERIAL_PORT = "/dev/ttyUSB0" 
SERIAL_BOUND_SPEED = 9600
# Sensor configuration

SENSOR_HR_THRESHOLD = {"MinHRate":100,"MaxHRate":130}
SENSOR_OPERC_THRESHOLD = {"MinOperc":98}
SENSOR_PRESSURE_THRESHOLD = {"MinMax":100,"MaxMax":150,"MinMin":50,"MaxMin":110}
# DB configuration
DB_HOST_ADDRESS = '82.50.172.4'
DB_USER = 'root'
DB_PASSWORD = 'pwd'
DB_NAME = 'remoteMonitoring'
DB_AUTH_PLUGIN = 'mysql_native_password'

CONNECTION_STRING = "mysql+pymysql://"+DB_USER+":"+DB_PASSWORD+"@"+DB_HOST_ADDRESS+":3306/"+DB_NAME+""
