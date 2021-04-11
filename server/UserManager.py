from DBConnection import DBConnection
from user import User

class UserManager(object):

    def __init__(self):        
        pass
    

    def getDBConnection(self):
        return DBConnection()
    
    def lookup_user(self, googleId): # the name is inerithed from UserManager object
        DB = self.getDBConnection()
        DB.getUserById(googleId)

    def insertUserOrNothing(self,googleId,username,email,password,accountType):
        DB = self.getDBConnection()
        record = DB.getUserByEmail(email)
        if(len(record) == 0): # new user
            DB.insertUser(googleId,username,email,password,accountType)   # mettere controllo scrittura 

        user = User(googleId,username,email,accountType)
        return user