FROM mhart/alpine-node:8

RUN mkdir /usr/html
RUN mkdir /landing
WORKDIR /landing



COPY package.json .

RUN npm install http-server -g
RUN npm install -g @angular/cli

RUN npm install

COPY src src
COPY angular.json .
COPY tsconfig.json .
COPY webpack.server.config.js .
COPY server.ts .

ARG APP_PROD='true'
ARG LB_BASE_URL='http://localhost/api'
ARG LB_API_VERSION=''



RUN ng build --configuration=dmsc  && ng run LandingPageServer:server:dmsc && npm run webpack:server

WORKDIR /landing/dist/browser
EXPOSE 8080
CMD ["http-server"]
