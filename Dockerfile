FROM node:18.17.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]