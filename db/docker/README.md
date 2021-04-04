The execution command for mysql docker is the following:
docker run --name mysql-monitoring -p 3306:3306 -v ABSOLUTE-PATH:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=PASSWORD -d mysql

The command executes a mysql docker and exposes the 3306 port; in the ABSOLUTE-PATH the data will be stored so that you can save your data after the docker is turned off.
