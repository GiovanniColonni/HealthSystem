from flask import Blueprint, request, jsonify, make_response
from flask_login import login_required
import jsonpickle
from pathlib import Path
from db.queries.SelectQuery import SelectQuery
from db.queries.InsertQuery import InsertQuery
from db.queries.UpdateQuery import UpdateQuery

doctor = Blueprint('doctor', __name__, url_prefix="/api/doctor")


@doctor.route('/<doctorId>')
@login_required
def get_doctor(doctorId):
    doctor_id = doctorId
    s = SelectQuery()
    # request.cookies.get('remember_token').split('|')[0])  # instruction to get googleID from request
    doctor = s.get_doctor(doctor_id)
    if doctor is False:
        return jsonify(False)
    return jsonify(row2dict(doctor))


@doctor.route('/profileImage', methods=['POST'])
# @login_required
def upload_profile_image():
    googleId = request.form.get('googleId')
    file = request.files['file']
    u = UpdateQuery()
    u.update_profile_image(googleId, file.filename)
    destination = 'doctor_image/' + file.filename
    file.save(destination)
    return make_response(jsonify(True), 200)


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


@doctor.route('/<doctorId>/patients')
@login_required
def get_patient_list_from_doctor(doctorId):
    s = SelectQuery()
    patients = s.get_patient_list_from_doctor(doctorId)
    row_list = []
    for row in patients:
        row_list.append(row2dict(row))
    return jsonify(row_list)


@doctor.route('lastComment/<patientId>')
@login_required
def get_last_patient_comment(patientId):
    s = SelectQuery()
    comment = s.get_last_patient_comment(patientId)
    if comment.description is not None:
        return jsonify(row2dict(comment))
    return make_response(jsonify("comment not found"), 404)


@doctor.route('prescription', methods=['POST'])
@login_required
def insert_prescription():
    patientId = request.form.get('patientId')
    pathFileSystem = request.form.get('pathFileSystem')
    notePrescription = request.form.get('notePrescription')
    date = request.form.get('date')
    doctorId = request.form.get('doctorId')
    file = request.files['file']
    i = InsertQuery()
    if not Path('prescriptions/' + patientId).is_dir():
        Path('prescriptions/' + patientId).mkdir()
    destination = 'prescriptions/' + patientId + '/' + file.filename
    # save prescription in the database
    if i.insert_prescription(patientId, file.filename, notePrescription, date, doctorId):
        file.save(destination)
        return make_response(jsonify("upload successfully"), 200)
    return make_response(jsonify("ERROR"), 400)


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
