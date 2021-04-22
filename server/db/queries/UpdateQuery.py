from db import DatabaseSession
from db.entities import Account

class UpdateQuery:

    def updateUserType(self,id,userType):
        with DatabaseSession() as session:
            session.update(Account) \
                .where(id == Account.googleId) \
                .values(type = userType)

            print("Done ??")
            return 1