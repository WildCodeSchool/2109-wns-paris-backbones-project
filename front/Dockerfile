FROM node:lts-alpine

RUN mkdir /front
WORKDIR /front

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY ./tailwind.config.js ./
COPY vite.config.ts ./
COPY postcss.config.js ./
COPY index.html ./

RUN yarn

RUN apk add --no-cache openssl

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

COPY src src
COPY public public

CMD yarn dev
