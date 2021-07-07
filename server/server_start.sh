#!/bin/bash
# se si ha ufw > ufw allow 5000
# installare prima nginx
echo "Start HealthSystem"

uwsgi --https 0.0.0.0:5000,./cert/cert.pem,./cert/key.pem  -w wsgi:app