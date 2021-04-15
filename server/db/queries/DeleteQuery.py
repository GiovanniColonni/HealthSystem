from db import DatabaseSession
from db.entities import Account


class DeleteQuery:
    def delete_account_by_email(self, email):
        """
        Deletes a user account by email, if it exists;
        :param email: user's email
        """
        user_entity = Account

        with DatabaseSession() as session:
            data = session.query(user_entity). \
                filter(user_entity.email == email). \
                first()
            if data is None:
                return False

            session.delete(data)
            session.commit()
            return True