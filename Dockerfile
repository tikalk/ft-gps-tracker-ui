FROM node:7

EXPOSE 8888

CMD node server.js

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ADD package.json /usr/src/app/
RUN npm install
ADD . /usr/src/app

# CMD [ "npm", "start" ]