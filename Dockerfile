FROM node:14-alpine AS builder

LABEL maintainer="henrik.johansson@ess.eu"
RUN sed -i -e 's/^root::/root:!:/' /etc/shadow
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN npm config set registry http://registry.npmjs.org/
RUN npm config set strict-ssl false

ARG env=essprod
WORKDIR /landing
COPY package*.json /landing/
RUN npm ci
COPY . /landing
RUN npx ng build --configuration=${env}

FROM nginx:alpine

RUN sed -i -e 's/^root::/root:!:/' /etc/shadow
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /landing/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY CI/ESS/google43e14584df796f63.html /usr/share/nginx/html

EXPOSE 80
