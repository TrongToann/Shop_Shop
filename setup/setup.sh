#!/bin/bash
echo *******************************************
echo Starting the replica set
echo *******************************************

sleep 10 | echo Sleeping
mongo mongo-primary:27017 replicaSet.js
