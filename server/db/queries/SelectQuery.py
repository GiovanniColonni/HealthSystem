from db import DatabaseSession
from db.entities import Account, Doctor, Patient, Schedule
from sqlalchemy.orm import defer


class SelectQuery:

    def select_doctor_by_patient(self, patientId):
        with DatabaseSession() as session:
            doctor = session.query(Doctor, Patient) \
                .with_entities(Doctor) \
                .filter(patientId == Patient.id) \
                .filter(Doctor.id == Patient.doctorId) \
                .first()
            return doctor

    def select_event_by_doctor(self, doctorId):
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

    