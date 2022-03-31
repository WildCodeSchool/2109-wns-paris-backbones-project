FROM node:lts-alpine

RUN mkdir /files_services
WORKDIR /files_services

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

RUN yarn

COPY src src
COPY public public

CMD yarn dev