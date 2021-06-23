export default class Prescription {
    constructor(id, patientId, pathFileSystem, notePrescription, date, doctorId){
        this.id = id;
        this.patientId = patientId;
        this.pathFileSystem = pathFileSystem;
        this.notePrescription = notePrescription;
        this.date = date;
        this.doctorId = doctorId;
    }
  }
  