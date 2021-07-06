#!/bin/bash

cd /home/pi/Desktop/ProgettoEmbedded/raspberry/totem/
uwsgi --socket 0.0.0.0:5001 --protocol=http -w wsgi:app
sleep 5

cd /home/pi/Desktop/ProgettoEmbedded/raspberry/client/totem-gui/
BROWSER=none npm start &
sleep 30 

chromium-browser http://localhost:3000/measure & sleep 15;
xte "key F11" -x:0;