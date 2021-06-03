from db import DatabaseSession
from db.entities import Account, Doctor, Patient, Schedule, Prescription
from flask import Flask, send_file
from sqlalchemy.orm import defer
from sqlalchemy.sql import text


class SelectQuery:

    def select_doctor_by_patient(patientId):
        with DatabaseSession() as session:
            doctor = session.query(Doctor, Patient) \
                .with_entities(Doctor) \
                .filter(patientId == Patient.id) \
                .filter(Doctor.id == Patient.doctorId) \
                .first()
            return doctor

    def select_event_by_doctor(self,doctorId):
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

    def get_event_by_patient(self, patientId):
        """
        :param patientId:
        :return: a list of Event objects
        .. note:: you can access to parameters like this:
            for ev in event:
                print(ev.dateStart)
        """
        with DatabaseSession() as session:
            events = session.query(Patient, Schedule) \
                .with_entities(Schedule) \
                .filter(patientId == Schedule.patientId) \
                .all()
            return events

    def get_all_patient_prescriptions(self, patientId):
        """
        :param patientId:
        :return: a list of prescriptions
        """
        with DatabaseSession() as session:
            events = session.query(Prescription) \
                .filter(patientId == Prescription.patientId) \
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

    def get_doctor_image(self,doctorId):
        """
        :param doctorId: it works also with patientId
        :return: return the doctor image
        """
        with DatabaseSession() as session:
            image = session.query(Account) \
                .with_entities(Account.image) \
                .filter(doctorId == Account.id) \
                .first()
            if image is not None:
                image = image.image
            return image


    def get_prescription_file(self, patientId, pathFileSystem):
        """
        :param patientId:
        :param pathFileSystem:
        :return: return the prescription image
        """
        with DatabaseSession() as session:
            file = session.query(Prescription) \
                .with_entities(Prescription.pathFileSystem) \
                .filter(patientId == Prescription.patientId) \
                .filter(pathFileSystem == Prescription.pathFileSystem) \
                .first()
            if file is not None:
                file = file.pathFileSystem
            return file

    def get_patient(self, patientId):
        """

        :param patientId:
        :return: patient row
        """
        with DatabaseSession() as session:
            patient = session.query(Patient) \
                .filter(patientId == Patient.googleId) \
                .first()
            if patient is None:
                return False
            return patient

    def get_doctor(self, doctorId):
        """

        :param doctorId:
        :return: doctor row
        """
        with DatabaseSession() as session:
            doctor = session.query(Doctor) \
                .filter(doctorId == Doctor.googleId) \
                .first()
            if doctor is None:
                return False
            return doctor

    def get_patient_list_from_doctor(self, doctorId):
        """
        :param doctorId:
        :return: patient list
        """
        with DatabaseSession() as session:
            patients = session.query(Patient) \
                .filter(doctorId == Patient.doctorId)
            return patients

    def get_last_patient_comment(self, patientId):
        """
        :param patientId:
        :return:
        """
        with DatabaseSession() as session:
            comment = session.query(Schedule) \
                .filter(patientId == Schedule.patientId) \
                .order_by(text('dateStart desc')) \
                .first()
            return comment

