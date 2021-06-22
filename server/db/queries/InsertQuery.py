from sqlalchemy.exc import SQLAlchemyError

from .. import DatabaseSession
from ..entities import Account
from ..entities import Patient
from ..entities import Doctor
from ..entities import Measure
from ..entities import Schedule
from ..entities import Prescription
from sqlalchemy import insert
import requests
import json
from db.queries.SelectQuery import SelectQuery
from .. import engine
connection = engine.connect()


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

    def insert_patient(self, name, surname, doctorId, date, fiscalCode, googleId):
        instance = Patient(name=name,
                           doctorId=doctorId,
                           surname=surname,
                           date=date,
                           fiscalCode=fiscalCode,
                           googleId=googleId
                           )
        try:
            with DatabaseSession() as session:
                result = connection.execute("INSERT INTO `remoteMonitoring`.`patient` (`name`, `surname`, `doctorId`, `date`, `fiscalCode`, `googleId`) VALUES ('"+name+"', '"+surname+"', '"+doctorId+"', '"+date+"', '"+fiscalCode+"', '"+googleId+"');")
                #session.add(instance)
                #session.commit()
                return True
        except SQLAlchemyError:
            print("EXCEPTION!!!")
            print("HANDLE THIS EXCEPTION")
            return False

    def insert_doctor(self, name, surname, date, fiscalCode, googleId):
        try:
            with DatabaseSession() as session:
                result = connection.execute("INSERT INTO `remoteMonitoring`.`patient` (`name`, `surname`, `doctorId`, `date`, `fiscalCode`, `googleId`) VALUES ('"+name+"', '"+surname+"', '"+doctorId+"', '"+date+"', '"+fiscalCode+"', '"+googleId+"');")
                #session.add(instance)
                #session.commit()
                return True
        except SQLAlchemyError:
            print("EXCEPTION!!!")
            print("HANDLE THIS EXCEPTION")
            return False

    def insert_doctor(self, name, surname, date, googleId):
        try:
            with DatabaseSession() as session:
                result = connection.execute(
                    "INSERT INTO `remoteMonitoring`.`doctor` (`name`, `surname`,`date`,`googleId`) VALUES ('" + name + "', '" + surname + "', '" + date + "', '" + googleId + "');")
                # session.add(instance)
                # session.commit()
                return True
        except SQLAlchemyError:
            print("EXCEPTION!!!")
            print("HANDLE THIS EXCEPTION")
            return False

    def insert_measure(self, patientId, type, value, date):
        user_entity = Measure
        print(f"{patientId}{type}{value}{date}")
        instance = user_entity(patientId=patientId,
                               type=type,
                               value=value,
                               date=date
                               )
        try:
            with DatabaseSession() as session:
                session.add(instance)
                session.flush()
                session.commit()
                # send notifications
                s =  SelectQuery()
                pushTokens = s.get_push_token(patientId)
                pushTokens = pushTokens.split(',')
                for token in pushTokens:
                    if token != "":
                        r = requests.post('https://exp.host/--/api/v2/push/send', headers={
                            'host' : 'exp.host',
                            'accept' : 'application/json',
                            'accept-encoding' : 'gzip, deflate',
                            'content-type' : 'application/json'
                        },data=json.dumps({'to' : token, 'title' : 'out-of-threshold value', 'body' : 'describe the problem'}))
                        print(r.status_code, r.reason)
                        print(token)
                return True
        except SQLAlchemyError:
            print("EXCEPTION!!!")
            print("HANDLE THIS EXCEPTION")
            return False

    def insert_appointment(self, patientId, doctorId, dateStart, typeExamination, description, dateEnd, meetingURL):
        user_entity = Schedule
        instance = user_entity(patientId=patientId,
                               doctorId=doctorId,
                               dateStart=dateStart,
                               typeExamination=typeExamination,
                               description=description,
                               dateEnd=dateEnd,
                               meetingURL=meetingURL
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

    def insert_prescription(self, patientId, pathFileSystem, notePrescription, date):
        user_entity = Prescription
        instance = user_entity(patientId=patientId,
                               pathFileSystem=pathFileSystem,
                               notePrescription=notePrescription,
                               date=date
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