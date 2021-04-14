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

        cursor.close()
        # qui close db

    def insertUser(self, googleId,username,email,password,accountType):
        code = 0
        query = "INSERT INTO account VALUES ( %(email)s, %(password)s, %(accountType)s, %(googleId)s, %(username)s )"
        cursor = self.conn.cursor()
        cursor.execute(query,{"email":email,"password":password,"accountType":accountType,"googleId":googleId,"username":username})
        self.conn.commit()
        if cursor.rowcount != 1:
            print("Error inserting user")
            code = 1
        cursor.close()
        return code

    def getUserById(self,id):
        query = "SELECT * FROM account WHERE googleId = %(id)s"
        cursor = self.conn.cursor()
        cursor.execute(query,{"id":id})
        records = cursor.fetchall()
        cursor.close()
        return records
        
    def getUserByEmail(self,email):
        query = "SELECT * FROM account WHERE email = %(email)s"
        cursor = self.conn.cursor()
        cursor.execute(query,{"email":email})
        records = cursor.fetchall()
        cursor.close()

        return records


    def getAll(self):
        query = "SELECT * FROM account"
        cursor = self.conn.cursor()
        cursor.execute(query)
        records = cursor.fetchall()
        cursor.close()

        return records
