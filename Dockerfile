FROM node:16.20.1

WORKDIR /app

COPY package*.json ./

RUN npm install && apt-get update && apt-get install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]