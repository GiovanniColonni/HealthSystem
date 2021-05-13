
from flask_login import UserMixin

# UserMixin : provide the default behavior for Login Manager (used inot auth)

class User(UserMixin):
    
    def __init__(self,googleId,username,email,userType):
        self.id = googleId # id required by UserMixin
        self.username = username
        self.email = email
        self.userType = userType

    def updateType(userType):
        self.type = userType


