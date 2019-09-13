#!/bin/bash

RESULT=`mysqlshow --user=root --password=taina agro| grep -v Wildcard | grep -o agro`
if [ "$RESULT" != "agro" ]; then
    mysql --user=root --password=taina -e "create database agro CHARACTER SET utf8 COLLATE utf8_general_ci;"; 
fi