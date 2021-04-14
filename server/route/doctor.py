from flask import Blueprint, request, jsonify
import jsonpickle

from db.queries.SelectQuery import SelectQuery

doctor = Blueprint('doctor', __name__, url_prefix="/doctor")

@doctor.route('/event')
def index():
    doctor_id = request.args.get('doctorId')
    s = SelectQuery()
    events = s.select_event_by_doctor(doctor_id)
    row_list = []
    for row in events:
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