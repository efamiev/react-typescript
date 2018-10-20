FROM node:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

VOLUME "/app/node_modules"

CMD [ "npm", "run", "dev" ]
