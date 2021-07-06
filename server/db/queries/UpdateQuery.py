from setuptools.sandbox import pushd

from db import DatabaseSession
from db.entities import Account
from db.entities import Patient


def account_is_none(account):
    if account is None:
        print("userId NOT FOUND!!!")
        return True
    return False


class UpdateQuery:

    def update_profile_image(self, googleId, image):
        with DatabaseSession() as session:
            account = session.query(Account) \
                .filter(googleId == Account.id).first()
            if account_is_none(account):
                return False
            account.image = image
            session.commit()
            return account

    def update_user_type(self, userId, userType):
        with DatabaseSession() as session:
            account = session.query(Account) \
                .filter(userId == Account.id).first()
            if account_is_none(account):
                return False
            account.userType = userType
            session.commit()
            return account

    def update_doctorId_in_patient(self, doctorId, patientId):
        with DatabaseSession() as session:
            account = session.query(Patient) \
                .filter(patientId == Patient.googleId).first()
            if account_is_none(account):
                return False
            account.doctorId = doctorId
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
