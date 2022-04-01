FROM node:lts-alpine

WORKDIR /back_files_services

COPY package.json ./
COPY tsconfig.json ./
COPY yarn.lock ./

RUN yarn global add ts-node
RUN yarn

COPY src src
copy index.ts index.ts


CMD yarn start


