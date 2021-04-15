from sqlalchemy.exc import SQLAlchemyError

from .. import DatabaseSession
from ..entities import Account


class InsertQuery:

    def create_account(self, email, username, password, type, googleId):
        """
        Creates a new account
        :param email: user's email
        :param username: username
        :param password: password
        :param type: type
        :param googleId: googleId
        """
        user_entity = Account
        instance = user_entity(email=email,
                               username=username,
                               password=password,
                               type=type,
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


