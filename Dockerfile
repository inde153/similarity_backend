FROM node:18.17.1-alpine AS build

WORKDIR /app

RUN apk update && apk add --no-cache wget gzip

RUN mkdir -p data && \
    cd data && \
    wget https://dl.fbaipublicfiles.com/fasttext/vectors-crawl/cc.ko.300.vec.gz && \
    gzip -d cc.ko.300.vec.gz

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


FROM node:18.17.1-alpine

WORKDIR /app

ARG NODE_ENV=dev
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm ci

EXPOSE 8080

CMD [ "node", "dist/main.js" ]