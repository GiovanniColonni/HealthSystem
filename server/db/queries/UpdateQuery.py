from db import DatabaseSession
from db.entities import Account


class UpdateQuery:

    def updateUserType(self, userId, userType):
        with DatabaseSession() as session:
            account = session.query(Account) \
                .filter(userId == Account.id).first()
            account.userType = userType
            session.commit()
            return True
