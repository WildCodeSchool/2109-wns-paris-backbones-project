#!/bin/sh

echo "Fetching latest code from GitHub" && \
docker-compose -f docker-compose-staging.yml down && \
docker-compose -f docker-compose-staging.yml pull -d && \
GATEWAY_PORT=3001 docker-compose -f docker-compose.staging.yml up -d
