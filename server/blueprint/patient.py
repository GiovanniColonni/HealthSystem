from flask import Blueprint, request, jsonify
from db.queries.SelectQuery import SelectQuery
from flask_login import login_required

patient = Blueprint('patient', __name__, url_prefix="/patient")

@patient.route('/doctors')
@login_required
def get_all_doctors():
    s = SelectQuery()
    events = s.get_all_doctor()
    row_list = []
    for row in events:
        row_list.append(row2dict(row))
    return jsonify(row_list)

@patient.route('/<patientId>')
@login_required
def get_patient(patientId):
    patient_id = patientId
    print(patient_id)
    s = SelectQuery()
    #request.cookies.get('remember_token').split('|')[0])  # instruction to get googleID from request
    patient = s.get_patient(patient_id)
    return jsonify(row2dict(patient))

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
