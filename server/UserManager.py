from DBConnection import DBConnection
from user import User
from db.queries.SelectQuery import SelectQuery
from db.queries.InsertQuery import InsertQuery
class UserManager(object):

    def __init__(self):        
        pass
    

    def getDBConnection(self):
        return DBConnection()
    
    def lookup_user(self, id):
        DB = self.getDBConnection()
        r = SelectQuery.get_user_by_id(id)
        for rec in r:
            u  = User(rec[3],rec[4],rec[0],rec[2])
        return u

    def insertUserOrNothing(self,googleId,username,email,accountType):
        DB = self.getDBConnection()
        user = SelectQuery.get_user_by_id(googleId)
        
        print(user)
        if(user != None): # new user
            # DB.insertUser(googleId,username,email,password,accountType)   # mettere controllo scrittura 
            InsertQuery.create_account(email,username,accountType,googleId,"") # push token ?
            # controllare se ritorna True
        user = User(googleId,username,email,accountType)
        return user