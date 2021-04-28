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
        
        r = SelectQuery.get_user_by_id(id)
        u  = User(r.id,r.username,r.email,r.userType)
        return u

    def insertUserOrNothing(self,googleId,username,email,accountType):
        user = SelectQuery.get_user_by_id(googleId)
        if(user != None): # new user
            # DB.insertUser(googleId,username,email,password,accountType)   # mettere controllo scrittura 
            InsertQuery.create_account(email,username,accountType,googleId,"") # push token ?
            # controllare se ritorna True
        user = User(googleId,username,email,accountType)
        return user