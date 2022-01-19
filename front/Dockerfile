FROM node:lts-alpine

RUN mkdir /front
WORKDIR /front

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY vite.config.ts ./
COPY postcss.config.js ./
COPY index.html ./

RUN yarn

COPY src src
COPY public public

CMD yarn dev
