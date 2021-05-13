import React, {useState} from 'react';
import { FaBell, FaRegBell } from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';

var notifstyle = {
    count: {
        height: "17px",
        width: "17px",
        maxWidth: "17px",
        minHeight: "17px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    
        position: "absolute",
        top: "4px",
        right: "6px",
        fontSize: "20px",
        fontWeight: "bold",
        fontFamily: "Bree Serif",
        borderRadius: "50%",
        color: "#FF9052",
    }
  };

export default function NotificationButton(props) {
      return (
        <>
            
            <div  >
                <IconButton onClick={props.onClick}>
                    <FaBell />
                    <div style={notifstyle.count}> {props.count} </div>
                </IconButton>
            </div>

        </>
      );
}