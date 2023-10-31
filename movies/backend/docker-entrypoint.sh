#!/bin/sh

echo "Waiting for MongoDB to start..."
./wait-for dbh:27017 
./wait-for dba:27018 


# echo "Migrating the databse..."
# npm run db:up 

echo "Starting the server..."
npm start 