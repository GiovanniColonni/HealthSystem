import React from 'react';
import { Row, Item } from '@mui-treasury/components/flex';
import {FaUserCircle} from 'react-icons/fa';

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
    }, btn: {
        borderRadius: 20,
        padding: '0.125rem 0.75rem',
        borderColor: '#becddc',
        fontSize: '0.75rem',
    }, border: {
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "#BEBEBE",
        borderRadius: "5px",
        padding: "5px",
        width: "60%",
        marginLeft: "auto",
        marginRight: "auto"
    }, icon: {
        height: "50px",
        width: "50px"
    }
}
  
export default function UserCard(props) {
      return (
          <>
        <Row gap={2} p={2.5} style={cardstyle.border}>
          <Item>
                <FaUserCircle style={cardstyle.icon}/>
          </Item>
          <Row wrap grow gap={0.5} minWidth={0}>
            <Item grow minWidth={0}>
              <div style={cardstyle.title}>{props.title}</div>
              <div style={cardstyle.caption}>
                {props.firstCaption}
              </div>
            </Item>
          </Row>
        </Row>
          </>
      );
    }