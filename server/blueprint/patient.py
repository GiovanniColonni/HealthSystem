from pathlib import Path
from sys import path

from flask import Blueprint, request, jsonify, send_file, abort, make_response
from db.queries.SelectQuery import SelectQuery
from db.queries.UpdateQuery import UpdateQuery
from db.queries.InsertQuery import InsertQuery
from flask_login import login_required

patient = Blueprint('patient', __name__, url_prefix="/api/patient")


@patient.route('/doctors')
@login_required
def get_all_doctors():
    s = SelectQuery()
    events = s.get_all_doctor()
    row_list = []
    for row in events:
        row_list.append(row2dict(row))
    return jsonify(row_list)


@patient.route('/doctorImage/<doctorId>')       # it works also with patientId for the patient image
@login_required
def get_doctor_image(doctorId):
    s = SelectQuery()
    image = s.get_doctor_image(doctorId)
    if image is not None:
        my_file = Path("doctor_image/" + image)
        if my_file.is_file():
            # file exists
            return send_file("doctor_image/" + image, mimetype='image/gif')
    return send_file("doctor_image/empty_user.png", mimetype='image/gif')


@patient.route('/prescription/<pathFileSystem>')
@login_required
def get_prescription_file(pathFileSystem):
    s = SelectQuery()
    patientId = request.cookies.get('remember_token').split('|')[0]  # instruction to get googleID from request
    image = s.get_prescription_file(patientId, pathFileSystem)
    if image is not None:
        my_file = Path("prescriptions/"+patientId+"/" + image)
        if my_file.is_file():
            # file exists
            return send_file("prescriptions/"+patientId+"/" + image, mimetype='application/pdf')
    return make_response(jsonify("prescription not found"), 404)


@patient.route('/<patientId>')
@login_required
def get_patient(patientId):
    patient_id = patientId
    s = SelectQuery()
    # request.cookies.get('remember_token').split('|')[0])  # instruction to get googleID from request
    patient = s.get_patient(patient_id)
    if patient is False:
        return jsonify(False)
    return jsonify(row2dict(patient))


@patient.route('/event/<patientId>')
@login_required
def get_patient_events(patientId):
    s = SelectQuery()
    events = s.get_event_by_patient(patientId)
    row_list = []
    for row in events:
        row_list.append(row2dict(row))
    return jsonify(row_list)


@patient.route('/<patientId>', methods=['PUT'])
@login_required
def doctorId_in_patient(patientId):
    doctorId = request.json.get('doctorId')
    print(request.cookies.get('remember_token').split('|')[0])
    print(patientId)
    if request.cookies.get('remember_token').split('|')[0] != patientId:
        return abort(403)
    u = UpdateQuery()
    patientId = request.cookies.get('remember_token').split('|')[0]  # instruction to get googleID from request
    u.update_doctorId_in_patient(doctorId, patientId)
    return jsonify(True)


@patient.route('/prescriptions/<patientId>')
@login_required
def get_all_prescritions(patientId):
    s = SelectQuery()
    prescriptions = s.get_all_patient_prescriptions(patientId)
    row_list = []
    for row in prescriptions:
        row_list.append(row2dict(row))
    return jsonify(row_list)


@patient.route('/measure', methods=['POST'])
@login_required
def insert_measure():
    patientId = request.form.get('patientId')
    type = request.form.get('type')
    value = request.form.get('value')
    name = request.form.get('name')
    date = request.form.get('date')
    i = InsertQuery()
    if i.insert_measure(patientId, type, value, name, date):
        return make_response("Ok", 200)
    return make_response("No Ok", 400)

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
