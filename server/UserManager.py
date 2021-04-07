from DBConnection import DBConnection
from user import User

class UserManager(object):

    def __init__(self):        
        pass
    

    def getDBConnection(self):
        return DBConnection()
    
    def lookupUser(self, googleId):
        DB = self.getDBConnection()
        DB.getUserById(googleId)

    def insertUserOrNothing(self,googleId,username,email,password,accountType):
        DB = self.getDBConnection()
        record = DB.getUserById(googleId)

        if(len(record) == 0): # new user
            DB.insertUser(googleId,username,email,password,accountType)   # mettere controllo scrittura 

        return googleId