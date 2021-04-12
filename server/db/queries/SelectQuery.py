from db import DatabaseSession
from db.entities import Account, Doctor, Patient
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
