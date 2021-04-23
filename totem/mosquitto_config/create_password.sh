#!/bin/bash

# eseguire lo scirpt con sudo

echo "Start creation of the password file"

mosquitto_passwd -U passwordfile

cp custom_mosquitto.conf /etc/mosquitto/conf.d
cp passwordfile /etc/mosquitto
# qui trovare il pid del processo broker e fare kill -HUP <pid>
# per aggiungere uno user alla lista si può usare 

# mosquitto_passwd -b passwordfile/user password
# per calcellare user : mosquitto_passwd -D passwordfile user
echo "End creation of the password file"
