#!/bin/bash

docker compose down

docker stop $(docker ps -a -q) && docker rm $(docker ps -aq)

docker rmi $(docker images -aq)

docker compose up
