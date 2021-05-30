import { React } from 'react';
import BigCalendar from './BigCalendar';
import { Row, Column } from '@mui-treasury/components/flex';
import TextField from '@material-ui/core/TextField';

var newappstyle = {
    container: {
        width: "80%",
        marginLeft: "auto", 
        marginRight: "auto"
    }, calendar: {
        width: "60%",
        marginLeft: "auto"
        
    }, form: {
        width: "30%"
    }
}

export default function NewAppointment({user}){
    return(
        <>
            <h1>New Appointment</h1>
            <Row gap={1.5} style={newappstyle.container}>
                <Column style={newappstyle.form}  gap={'inherit'}>
                    <Row>
                        <TextField label="Date" variant="outlined"/>
                    </Row>
                    <Row>
                        <TextField label="Hour" variant="outlined"/>
                    </Row>
                </Column>
                <Column style={newappstyle.calendar}  gap={'inherit'}>
                    <BigCalendar user={user}/>
                </Column>
            </Row>
            
        </>
    )
}