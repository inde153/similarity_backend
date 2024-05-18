FROM node:18.17.1

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y wget gzip

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8080

RUN mkdir -p data && \
    cd data && \
    wget https://dl.fbaipublicfiles.com/fasttext/vectors-crawl/cc.ko.300.vec.gz && \
    gzip -d cc.ko.300.vec.gz

RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]