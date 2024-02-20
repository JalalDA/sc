FROM node:18

WORKDIR /app

COPY package* .

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 8000

CMD [ "npm", "run", "start" ]