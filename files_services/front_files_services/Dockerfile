FROM node:lts-alpine

RUN mkdir /front_files_services
WORKDIR /front_files_services

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

RUN yarn

COPY src src
COPY public public

CMD yarn start