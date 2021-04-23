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
    password = Column(String(50), nullable=False)
    userType = Column(String(50), nullable=False)
    id = Column(String(50), primary_key=True)
    username = Column(String(50))


class Doctor(Base):
    __tablename__ = 'doctor'

    id = Column(INTEGER(11), primary_key=True)
    email = Column(ForeignKey('account.email'), nullable=False, unique=True)
    name = Column(String(45), nullable=False)
    surname = Column(String(45), nullable=False)
    date = Column(Date)

    account = relationship('Account')


class Patient(Base):
    __tablename__ = 'patient'

    id = Column(INTEGER(11), primary_key=True)
    email = Column(ForeignKey('account.email'), nullable=False, index=True)
    name = Column(String(45), nullable=False)
    surname = Column(String(45), nullable=False)
    doctorId = Column(ForeignKey('doctor.id'), index=True)
    date = Column(Date)

    doctor = relationship('Doctor')
    account = relationship('Account')


class Measure(Base):
    __tablename__ = 'measure'

    id = Column(INTEGER(11), primary_key=True)
    type = Column(String(45), nullable=False)
    pathFileSystem = Column(String(100))
    patientId = Column(ForeignKey('patient.id'), nullable=False, index=True)

    patient = relationship('Patient')


class Prescription(Base):
    __tablename__ = 'prescription'

    id = Column(INTEGER(11), primary_key=True)
    patientId = Column(ForeignKey('patient.id'), nullable=False, index=True)
    pathFileSystem = Column(String(100))
    notePrescription = Column(String(500))

    patient = relationship('Patient')


class Schedule(Base):
    __tablename__ = 'schedule'

    id = Column(INTEGER(11), primary_key=True, comment='description is used to write notes about the examination ')
    patientId = Column(ForeignKey('patient.id'), nullable=False, index=True)
    doctorId = Column(ForeignKey('doctor.id'), nullable=False, index=True)
    dateStart = Column(String(50), nullable=False)
    typeExamination = Column(String(45), nullable=False)
    description = Column(String(500))
    dateEnd = Column(String(50), nullable=False)

    doctor = relationship('Doctor')
    patient = relationship('Patient')
