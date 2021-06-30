export default class Event {
    constructor(id, title, start, end, allDay, description, conference, doctorId, patientId){
        this.id = id;
        this.title = title;
        this.start = start;
        this.end = end;
        this.allDay = allDay;
        this.description = description;
        this.conference = conference;
        this.doctorId = doctorId;
        this.patientId = patientId
    }
  }
  