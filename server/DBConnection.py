import mysql.connector

from config import (DB_HOST_ADDRESS, DB_USER, DB_PASSWORD, DB_NAME,DB_AUTH_PLUGIN)


def connection():
    conn = mysql.connector.connect(host=DB_HOST_ADDRESS,
                                    user=DB_USER,
                                    password=DB_PASSWORD,
                                    database=DB_NAME,
                                    auth_plugin=DB_AUTH_PLUGIN)
                                    
    return conn
    # c = conn.cursor()

def close():
    pass

class DBConnection:
    def __init__(self):
        self.conn = connection()
    
    def close(self):
        self.conn.close()
    
    def getAllPatient(self, doctor_id):
        query = "SELECT * FROM patient WHERE doctorId = %(doctorId)s"
        cursor = self.conn.cursor()
        cursor.execute(query, {"doctorId": doctor_id })
        for v in cursor:
            print(v)
        self.conn.commit()
        cursor.close()
        # qui close db