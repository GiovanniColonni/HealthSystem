docker run --name mysql-monitoring -p 3306:3306 -v /home/pi/embedded/docker:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=pwd -d mysql
