FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn install

RUN yarn build

COPY . .

EXPOSE 8080

CMD ["node", "app.js"]
