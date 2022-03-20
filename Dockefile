FROM node:lts-alpine

WORKDIR /usr/src/app

COPY . ./

RUN npm ci --only=production

CMD [ "node", "dev" ]

EXPOSE 3009
