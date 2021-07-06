#!/bin/bash

cd /home/pi/Desktop/ProgettoEmbedded/raspberry/totem/
python3 app.py &
sleep 5

cd /home/pi/Desktop/ProgettoEmbedded/raspberry/client/totem-gui/
BROWSER=none npm start &
sleep 30 

chromium-browser http://localhost:3000/measure & sleep 15;
xte "key F11" -x:0;