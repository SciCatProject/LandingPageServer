FROM node:9

RUN mkdir /usr/html
RUN mkdir /landing
WORKDIR /landing



COPY package.json .

ENV http_proxy "http://192.168.1.1:8123"
ENV https_proxy $http_proxy
ENV no_proxy "localhost, 127.0.0.1"
RUN npm config set proxy  $http_proxy
RUN npm config set https-proxy  $http_proxy
RUN npm config set registry http://registry.npmjs.org/
RUN npm config set strict-ssl false

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
RUN ls
RUN ls dist
COPY dist /dist/

WORKDIR /dist/browser
EXPOSE 8080
CMD ["http-server"]
