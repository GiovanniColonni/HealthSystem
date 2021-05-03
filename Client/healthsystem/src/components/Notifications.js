import React from 'react';
import Notifications from 'react-notifications-menu';

export default function NavigationBar() {
    return (
        <Notifications
            data={[
                {
                  image :'https://synergi-dev.s3.ap-southeast-1.amazonaws.com/profile-pictures/6b9.png' ,
                  message : 'Lorem ipsum dolor sit amet.',
                  detailPage : '/events', 
                  receivedTime:'12h ago'
                }
             ]}
        />
    );
}