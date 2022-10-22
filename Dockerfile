FROM node:16-alpine AS builder

RUN sed -i -e 's/^root::/root:!:/' /etc/shadow
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN npm config set registry http://registry.npmjs.org/
RUN npm config set strict-ssl false

ARG env=essprod

# Prepare app directory
WORKDIR /home/node/app
COPY package*.json /home/node/app/

# set up local user to avoid running as root
RUN chown -R node:node /home/node/app
USER node

# Install our packages
RUN npm ci
COPY --chown=node:node . /home/node/app/

# Build app
RUN npx ng build --configuration=${env}

FROM nginx:1.23.2-alpine

RUN sed -i -e 's/^root::/root:!:/' /etc/shadow
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /home/node/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY CI/ESS/google43e14584df796f63.html /usr/share/nginx/html

EXPOSE 80
