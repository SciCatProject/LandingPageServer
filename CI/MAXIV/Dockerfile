FROM node:14-alpine AS builder

RUN sed -i -e 's/^root::/root:!:/' /etc/shadow
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

ARG env=maxivprod
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

EXPOSE 80