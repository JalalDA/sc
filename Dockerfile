FROM node:14 as build

WORKDIR /usr/src/

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14-alpine

WORKDIR /usr/src/

COPY --from=build /usr/src/dist ./dist
COPY package*.json ./

RUN npm install --only=production

EXPOSE 8000

CMD ["node", "dist/index.js"]
