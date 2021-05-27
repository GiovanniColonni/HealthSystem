from flask import Blueprint, request, jsonify
from flask_login import login_required
import jsonpickle

from db.queries.SelectQuery import SelectQuery

doctor = Blueprint('doctor', __name__, url_prefix="/doctor")

@doctor.route('/<doctorId>')
@login_required
def get_doctor(doctorId):
    doctor_id = doctorId
    s = SelectQuery()
    # request.cookies.get('remember_token').split('|')[0])  # instruction to get googleID from request
    doctor = s.get_patient(doctor_id)
    if doctor is False:
        return jsonify(False)
    return jsonify(row2dict(doctor))

@doctor.route('/event')
@login_required
def index():
    doctor_id = request.args.get('doctorId')
    s = SelectQuery()
    events = s.select_event_by_doctor(doctor_id)
    row_list = []
    for row in events:
        row_list.append(row2dict(row))
    return jsonify(row_list)

@doctor.route('/patients')
@login_required
def get_patient_list_from_doctor(doctorId):
    s = SelectQuery()
    patients = s.get_patient_list_from_doctor(doctorId)
    row_list = []
    for row in patients:
        row_list.append(row2dict(row))
    return jsonify(row_list)


def row2dict(row):
    """
    *** **** Make this function global in order to use it from all files
    :param row:
    :return: it converts a db row to a dictionary (key:value pairs)
    """
    d = {}
    for column in row.__table__.columns:
        d[column.name] = str(getattr(row, column.name))
    return d
