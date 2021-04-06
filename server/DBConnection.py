import mysql.connector


def connection():
    conn = mysql.connector.connect(host="79.53.69.133",
                                   user='root',
                                   password='pwd',
                                   database='remoteMonitoring',
                                   auth_plugin='mysql_native_password')

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

