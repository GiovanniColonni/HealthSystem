import pymysql.cursor

#database connection
connection = pymysql.connect(host="localhost", user="root", passwd="pwd", database="remoteMonitoring")
cursor = connection.cursor()

#test query
def test():
    cursor.execute("SELECT * from doctor")
    result = cursor.fetchall()
    print(result)