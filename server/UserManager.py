from user import User
from db.queries.SelectQuery import SelectQuery
from db.queries.InsertQuery import InsertQuery

class UserManager(object):

    def __init__(self):        
        pass
    
    def lookup_user(self, id):
        
        r = SelectQuery.get_user_by_id(id)
        u  = User(r.id,r.username,r.email,r.userType,r.pushToken)
        return u

    def insertUserOrNothing(self,googleId,username,email,accountType,pushToken):
        user = SelectQuery.get_user_by_id(googleId)
        if(user != None): # new user
            print(f"[server] New User {username}")
            InsertQuery.create_account(email,username,accountType,googleId,pushToken) # push token ?
            # controllare se ritorna True
        user = User(googleId,username,email,accountType,pushToken)
        return user