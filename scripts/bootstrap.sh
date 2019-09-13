#!/bin/bash

sudo chmod 775 /vagrant/scripts/createDatabaseIfNotExist.sh 

#Create database
sudo bash -c "/vagrant/scripts/createDatabaseIfNotExist.sh"

#Run migrations
bash -c "python3.7 /vagrant/code/agro/manage.py makemigrations agro_api"
bash -c "python3.7 /vagrant/code/agro/manage.py migrate"

#Run server
cd /vagrant/code 
nohup npm run dev > /tmp/nohup.out &
bash -c "python3.7 /vagrant/code/agro/manage.py runserver 0.0.0.0:8000"