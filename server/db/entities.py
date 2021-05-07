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


class Measure(Base):
    __tablename__ = 'measure'

    id = Column(INTEGER(11), primary_key=True)
    type = Column(String(45), nullable=False)
    pathFileSystem = Column(String(100))
    patientId = Column(String(50), nullable=False)


class Prescription(Base):
    __tablename__ = 'prescription'

    id = Column(INTEGER(11), primary_key=True)
    patientId = Column(String(50), nullable=False)
    pathFileSystem = Column(String(100))
    notePrescription = Column(String(500))


class Schedule(Base):
    __tablename__ = 'schedule'

    id = Column(INTEGER(11), primary_key=True, comment='description is used to write notes about the examination ')
    patientId = Column(String(50), nullable=False)
    doctorId = Column(String(50), nullable=False)
    dateStart = Column(String(50), nullable=False)
    typeExamination = Column(String(45), nullable=False)
    description = Column(String(500))
    dateEnd = Column(String(50), nullable=False)


class Doctor(Base):
    __tablename__ = 'doctor'

    id = Column(INTEGER(11), primary_key=True)
    name = Column(String(45), nullable=False)
    surname = Column(String(45), nullable=False)
    date = Column(Date)
    googleId = Column(ForeignKey('account.id'), nullable=False, index=True)

    account = relationship('Account')


class Patient(Base):
    __tablename__ = 'patient'

    id = Column(INTEGER(11), primary_key=True)
    name = Column(String(45), nullable=False)
    surname = Column(String(45), nullable=False)
    doctorId = Column(ForeignKey('doctor.id'), index=True)
    date = Column(Date)
    fiscalCode = Column(String(45))
    googleId = Column(ForeignKey('account.id'), nullable=False, index=True)

    doctor = relationship('Doctor')
    account = relationship('Account')
