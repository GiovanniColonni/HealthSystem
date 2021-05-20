from db import DatabaseSession
from db.entities import Account, Doctor, Patient, Schedule
from sqlalchemy.orm import defer


class SelectQuery:

    def select_doctor_by_patient(patientId):
        with DatabaseSession() as session:
            doctor = session.query(Doctor, Patient) \
                .with_entities(Doctor) \
                .filter(patientId == Patient.id) \
                .filter(Doctor.id == Patient.doctorId) \
                .first()
            return doctor

    def select_event_by_doctor(doctorId):
        """
        :param doctorId:
        :return: a list of Event objects
        .. note:: you can access to parameters like this:
            for ev in event:
                print(ev.dateStart)
        """
        with DatabaseSession() as session:
            events = session.query(Doctor, Schedule) \
                .with_entities(Schedule) \
                .filter(doctorId == Schedule.doctorId) \
                .all()
            return events
        
    def get_user_by_id(self,userId):
        """
        :param userId:
        :return: user entry
        """
        with DatabaseSession() as session:
            account = session.query(Account) \
                .filter(userId == Account.id) \
                .first()
            return account

    def get_all_doctor(self):
        """
        :return: list of all doctor
        """
        with DatabaseSession() as session:
            doctor = session.query(Doctor) \
                .all()
            #for d in doctor:
             #   print(d.name)
            return doctor

    def get_patient(self,patientId):
        """

        :param patientId:
        :return: patient row
        """
        with DatabaseSession() as session:
            patient = session.query(Patient) \
                .filter(patientId == Patient.googleId) \
                .first()
            return patient
