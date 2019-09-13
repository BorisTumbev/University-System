#!/bin/bash

#Install Python 3.7
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.7 -y

#Install PIP
sudo apt install python3-pip -y
python3.7 -m pip install pip

#Install Mysql Server
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password taina'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password taina'
sudo apt-get -y install mysql-server -y

#Install Django
pip3 install Django==2.2.1 --user
pip3 install djangorestframework==3.9.3 --user
pip3 install django-rest-knox==4.0.1 --user
sudo apt-get install python3.7-dev -y
sudo apt-get install libmysqlclient-dev -y
pip3 install mysqlclient==1.4.2 --user

pip3 install cryptography==2.6.1 --user
#pip3 install cryptography interface==2.11.1 --user
pip3 install zeep==3.3.1 --user
pip3 install python-decouple --user
pip3 install pycryptodome==3.8.1 --user
pip3 install django-kronos==1.0 --user

#Install React
# sudo apt-get install nodejs npm -y
# sudo apt-get install nodejs=12.2.0 -y
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs


#Install Apache2
sudo apt-get install apache2 -y
sudo service apache2 restart

#Install phpMyAdmin
sudo DEBIAN_FRONTEND=noninteractive apt-get -yq install phpmyadmin
sudo bash -c "echo 'Include /etc/phpmyadmin/apache.conf' >> /etc/apache2/apache2.conf"
sudo service apache2 restart

#Install packages
cd /vagrant/code && npm install

#Change timezone
sudo timedatectl set-timezone Europe/Sofia
