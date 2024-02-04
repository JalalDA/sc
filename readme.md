initialisasi project express + typescript

~ create minimal express app
    $ npm init -y
    $ npm i express dotenv

~ installing typescript
    $ npm i -D typescript @types/express @types/node

~ generating ts-config.json
    $ npx tsc --init

~ create an express with .ts extension
~ running express with ts
    $ npx ts-node src/index.ts

~ running with nodemon 
    $ npm i -D nodemon ts-node

~ package.json for scripts
{
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts"
  }
}