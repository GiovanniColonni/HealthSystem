from sqlalchemy.exc import SQLAlchemyError

from .. import DatabaseSession
from ..entities import Account
from ..entities import Patient
from ..entities import Doctor


class InsertQuery:

    def create_account(self, email, username, user_type, id, push_token):
        """
        Creates a new account
        :param self: user's email
        :param username: username
        :param type: type
        :param id: id
        :param push_token: push_token
        """
        user_entity = Account
        instance = user_entity(email=email,
                               username=username,
                               userType=user_type,
                               id=id,
                               pushToken=push_token
                               )

        try:
            with DatabaseSession() as session:
                session.add(instance)
                session.flush()
                session.commit()
                return True
        except SQLAlchemyError:
            print("EXCEPTION!!!")
            print("HANDLE THIS EXCEPTION")
            return False

    def insert_patient(self,name,surname,doctorId,date,fiscalCode,googleId):
        user_entity = Patient
        instance = user_entity(name=name,
                               doctorId=doctorId,
                               surname=surname,
                               date=date,
                               fiscalCode=fiscalCode,
                               googleId=googleId
                               )
        try:
            with DatabaseSession() as session:
                session.add(instance)
                session.flush()
                session.commit()
                return True
        except SQLAlchemyError:
            print("EXCEPTION!!!")
            print("HANDLE THIS EXCEPTION")
            return False

    def insert_doctor(self, name, surname, date, googleId):
        user_entity = Doctor
        instance = user_entity(name=name,
                               surname=surname,
                               date=date,
                               googleId=googleId
                               )
        try:
            with DatabaseSession() as session:
                session.add(instance)
                session.flush()
                session.commit()
                return True
        except SQLAlchemyError:
            print("EXCEPTION!!!")
            print("HANDLE THIS EXCEPTION")
            return False

