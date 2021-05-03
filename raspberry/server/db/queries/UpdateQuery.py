from setuptools.sandbox import pushd

from db import DatabaseSession
from db.entities import Account


def account_is_none(account):
    if account is None:
        print("userId NOT FOUND!!!")
        return True
    return False


class UpdateQuery:

    def update_user_type(self, userId, userType):
        with DatabaseSession() as session:
            account = session.query(Account) \
                .filter(userId == Account.id).first()
            if account_is_none(account):
                return False
            account.userType = userType
            session.commit()
            return True

    def update_push_token(self, userId, pushToken):
        with DatabaseSession() as session:
            account = session.query(Account) \
                .filter(userId == Account.id).first()
            if account_is_none(account):
                return False
            account.pushToken = pushToken
            session.commit()
            return True
