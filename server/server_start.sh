#!/bin/bash
# se si ha ufw > ufw allow 5000
# installare prima nginx
echo "Start HealthSystem, first start ? (y/n)"
read fs
if [ ${fs} = "y" ]
then
    cp revProxy.conf /etc/nginx/site-avaible/
    ln -s /etc/nginx/site-avaible/revProxy.conf /etc/nginx/site-enabled/revProxy.conf # se da errore cancellare soft link in site-enabled
    nginx -t # se mostra errori modificare revProxy
    service nginx restart
    uwsgi --socket 0.0.0.0:5000 --protocol=http -w wsgi:app --enable-threads

elif [ ${fs} = "n" ]
then
    uwsgi --socket 0.0.0.0:5000 --protocol=http -w wsgi:app --enable-threads
else
    echo "not valid..exit"
fi