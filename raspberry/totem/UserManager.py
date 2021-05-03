from user import User

import requests


base_url = "http://0.0.0.0:5000" 

class UserManager(object):

    def __init__(self):        
        self.users = []

    def postLoginUser(self,googleId,username,email,password,accountType):
        url = base_url + "/login"
        headers = [{"X-Requested-With":"XmlHttpRequest"},{"Access-Control":"XmlHttpRequest"}]
        formData = {"googleId":googleId,"email":email,"email":email,"password":password,"accountType":accountType}
        r = requests.post(url=url,headers=headers,data=formData)
        
        print(r.json())

        if(r.status_code == "200"):
            return "r.payload"
        

    def lookup_user(self, id):
        for u in self.users:
            if u.id == id:
                return u
        return None

    def insertUserOrNothing(self,googleId,username,email,password,accountType):
        # call /totem/postUserLogin
        user_to_return = self.postLoginUser(googleId,username,email,password,accountType)       
        user = User(googleId,username,email,accountType)
        self.users.append(user)
        return user