# coding: utf-8
from sqlalchemy import Column, Date, ForeignKey, String
from sqlalchemy.dialects.mysql import INTEGER
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class Account(Base):
    __tablename__ = 'account'

    email = Column(String(50), nullable=False, unique=True)
    userType = Column(String(50), nullable=False)
    id = Column(String(50), primary_key=True)
    username = Column(String(50))
    pushToken = Column(String(45))
    image = Column(String(45))


class Doctor(Account):
    __tablename__ = 'doctor'

    name = Column(String(45), nullable=False)
    surname = Column(String(45), nullable=False)
    date = Column(Date)
    googleId = Column(ForeignKey('account.id'), primary_key=True, index=True)


class Patient(Account):
    __tablename__ = 'patient'

    name = Column(String(45), nullable=False)
    surname = Column(String(45), nullable=False)
    doctorId = Column(String(45))
    date = Column(String(45))
    fiscalCode = Column(String(45))
    googleId = Column(ForeignKey('account.id'), primary_key=True, index=True)

class Measure(Base):
    __tablename__ = 'measure'

    id = Column(INTEGER(11), primary_key=True)
    type = Column(String(45), nullable=False)
    pathFileSystem = Column(String(100))
    patientId = Column(ForeignKey('patient.googleId'), nullable=False, index=True)

    patient = relationship('Patient')


class Prescription(Base):
    __tablename__ = 'prescription'

    id = Column(INTEGER(11), primary_key=True)
    patientId = Column(ForeignKey('patient.googleId'), nullable=False, index=True)
    pathFileSystem = Column(String(100))
    notePrescription = Column(String(500))

    patient = relationship('Patient')


class Schedule(Base):
    __tablename__ = 'schedule'

    id = Column(INTEGER(11), primary_key=True, comment='description is used to write notes about the examination ')
    patientId = Column(ForeignKey('patient.googleId'), nullable=False, index=True)
    doctorId = Column(ForeignKey('doctor.googleId'), nullable=False, index=True)
    dateStart = Column(String(50), nullable=False)
    typeExamination = Column(String(45))
    description = Column(String(500))
    dateEnd = Column(String(50), nullable=False)
    meetingURL = Column(String(45))

    doctor = relationship('Doctor')
    patient = relationship('Patient')
