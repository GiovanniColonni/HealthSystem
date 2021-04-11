from DBConnection import DBConnection

DB = DBConnection()
r = DB.getUserByEmail("giovacolo97@gmail.com")

for rec in r:

    print(rec[1])