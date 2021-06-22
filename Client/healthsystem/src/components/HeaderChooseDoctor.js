import React from 'react';
import Logo from './Logo';
import Typography from '@material-ui/core/Typography';
import { Row, Column } from '@mui-treasury/components/flex';


const headerstyle = {
    item: {
      justifyContent: "center",
      alignItems: "center"
    },
    green: {
        color: '#61AB45'
    }
}

const HeaderChooseDoctor = (props) =>{
    let {username} = props
    return (
        <>
        <Column p={3}>
            <Row p={1}>
                <Logo />
            </Row>
            <Row style={headerstyle.item}>
                <Typography variant='h3'>Welcome {username}!</Typography>
            </Row>
            <Row style={headerstyle.item}>
                <Typography variant='h3'>To complete your profile, choose a doctor</Typography>
            </Row>
            <Row style={headerstyle.item}>
                <Typography style={headerstyle.green} gutterBottom>This will be your family doctor, who will follow you</Typography>
            </Row>
        </Column>
        </>
    );
}
export default HeaderChooseDoctor;