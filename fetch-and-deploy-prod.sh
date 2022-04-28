#!/bin/sh

docker-compose down && \
docker-compose pull -d && \
GATEWAY_PORT=3000 docker-compose up -d
