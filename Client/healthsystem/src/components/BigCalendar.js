import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Event from '../classes/Event'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)
export default function BigCalendar() {

  // REMEMBER TO USE .toDate(); moment() not works with bigCalendar
  const sampleEvent = [new Event("Title1",moment().toDate(),moment().add(1,"days").toDate(),false,null)]
  return (
    <div>
    <Calendar
      localizer={localizer}
      events={sampleEvent}
      defaultDate={new Date()}
      defaultView="month"
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }} // remove style here. Use CSS file
    />
    </div>
  );
}