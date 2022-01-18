FROM node:lts-alpine

RUN mkdir /back
WORKDIR /back

COPY package.json ./
COPY yarn.lock ./
COPY .env.prod ./
COPY tsconfig.json ./
COPY ormconfig.ts ./

RUN yarn

COPY src src

CMD yarn start

