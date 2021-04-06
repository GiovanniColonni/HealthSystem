import mysql.connector

from config import DB_HOST_ADDRESS, DB_USER, DB_PASSWORD, 

def connection():
    conn = mysql.connector.connect(host=DB_HOST_ADDRESS,
                                   user=DB_USER',
                                   password=DB_PASSWORD,
                                   database=DB_NAME,
                                   auth_plugin=DB_AUTH_PLUGIN)

    # c = conn.cursor()
    return conn


class DBConnection:
    def __init__(self):
        self.conn = connection()

    def getAllPatient(self, doctor_id):
        query = "SELECT * FROM patient WHERE doctorId = %(doctorId)s"
        cursor = self.conn.cursor()
        cursor.execute(query, {"doctorId": doctor_id })
        for v in cursor:
            print(v)

