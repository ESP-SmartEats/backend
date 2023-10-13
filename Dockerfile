FROM node:18

WORKDIR /dist

COPY package*.json ./

RUN yarn install

RUN yarn build

COPY . .

EXPOSE 8080

CMD ["node", "dist/app.js"]
