from sqlalchemy.exc import SQLAlchemyError

from .. import DatabaseSession
from ..entities import Account


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
        instance = user_entity(email=self,
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


