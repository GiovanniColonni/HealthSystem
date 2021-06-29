import { React } from 'react';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import { Row, Column, Item } from '@mui-treasury/components/flex';
import Typography from '@material-ui/core/Typography';
import { PassedAppointmentList, TodayAppointmentList, FutureAppointmentList } from './AppointmentCard';

var homestyle = {
    btnCreate: {
        backgroundColor: "#F95F62"
    },
    titles: {
        fontSize: '24px',
        fontStyle: 'italic',
        color: '#616161',
        padding: '6px'
    },
    border: {
        borderStyle: 'solid',
        borderRadius: '5px',
        borderWidth: '1px',
        borderColor: '#bdbdbd',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '28px',
        paddingRight: '28px',
        paddingBottom: '28px'
    }
}
function Home({user}){
    
    const history = useHistory();

    const gotoNewAppointment = () =>{
        history.push('/newAppointment');
    }

    return(
        <>
        <Row p={1} style={{width: '90%', margin: 'auto'}}>
            <Column style={{width: '60%', margin: 'auto'}}>
                <Row >
                    <Typography variant="h5" 
                        style={homestyle.titles}>
                            My Future Appointments
                    </Typography>
                </Row>
                <Row p={1} >
                    <Button
                        variant="contained"
                        color="secondary"
                        style={homestyle.btnCreate}
                        onClick={() => gotoNewAppointment()}
                    >
                        New Appointment
                    </Button>
                </Row>
                <div style={{marginLeft: '50px', marginTop: '10px'}}>
                    <FutureAppointmentList user={user} />
                </div>

                <Row style={{marginTop: '30px'}}>
                    <Typography variant="h5" style={homestyle.titles} align="left">My Passed Appointments</Typography>
                </Row>
                <div style={{marginLeft: '50px', marginTop: '10px'}}>
                    <PassedAppointmentList user={user} />
                </div>
            </Column>
            <Column>
                <div style={homestyle.border}>
                <Item>
                    <Typography variant="h5" style={homestyle.titles}>Today</Typography></Item>
                <Item style={{marginLeft: 'auto', marginRight: 'auto'}}>
                    <TodayAppointmentList user={user} />
                </Item>
                </div>
            </Column>
        </Row>
        </>
    )
}
export default Home