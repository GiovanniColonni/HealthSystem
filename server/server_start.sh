#!/bin/bash
# se si ha ufw > ufw allow 5000
# installare prima nginx
cp revProxy.conf /etc/nginx/site-avaible/
ln -s /etc/nginx/site-avaible/revProxy.conf /etc/nginx/site-enabled/revProxy.conf # se da errore cancellare soft link in site-enabled
nginx -t # se mostra errori modificare revProxy
service nginx restart
uwsgi --socket 0.0.0.0:5000 --protocol=http -w wsgi:app --enable-threads

