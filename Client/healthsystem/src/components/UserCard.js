import React from 'react';
import { Row, Item } from '@mui-treasury/components/flex';
import {FaUserCircle} from 'react-icons/fa';
import {useHistory} from "react-router";
import API_patient from '../api/API_patient';

var cardstyle = { 
    title: {
        fontFamily: "Lato",
        fontWeight: 600,
        fontSize: '1rem',
        color: '#122740',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textAlign: 'left',
    }, caption: {
        fontFamily: "Lato",
        fontSize: '0.875rem',
        color: '#758392',
        marginTop: -4,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textAlign: 'left',
    }, border: {
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "#BEBEBE",
        borderRadius: "5px",
        padding: "5px",
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto",
        cursor: "pointer"
    }, icon: {
        height: "50px",
        width: "50px"
    }
}
  
export function UserCard(props) {
  
  let history = useHistory()

  const gotoDetails = () =>{ 
    history.push('\patientDetails');
  }
      return (
        <div onClick={gotoDetails}>
        <Row gap={2} p={2.5} style={cardstyle.border}>
          <Item>
                <img src={"/patient/doctorImage/"+props.patientId} style={cardstyle.icon}/>
          </Item>
          <Row wrap grow gap={0.5} minWidth={0}>
            <Item grow minWidth={0}>
              <div style={cardstyle.title}>{props.title}</div>
              <div style={cardstyle.caption}>
                {props.caption}
              </div>
            </Item>
          </Row>
        </Row>
        </div>
      );
    }

export function UserCardList(props) {
  return (
    <>
      {props.userlist.map(user => (
          <UserCard title={user.name} caption={user.info}/>
        ))}
    </>
  );
}