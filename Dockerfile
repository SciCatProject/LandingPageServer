FROM node:9

RUN apt-get update && apt-get install -y nginx

RUN mkdir /usr/html
RUN mkdir /landing
WORKDIR /landing


COPY package.json .
RUN npm install

COPY src src
COPY angular.json .
COPY tsconfig.json .
COPY webpack.server.config.js .
COPY server.ts .

ARG APP_PROD='true'
ARG LB_BASE_URL='http://localhost/api'
ARG LB_API_VERSION=''

RUN npm install http-server -g


RUN npm run build:ssr
COPY dist /dist

WORKDIR /dist/browser
EXPOSE 8080
CMD ["http-server"]
