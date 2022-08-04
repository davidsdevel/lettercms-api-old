FROM node:lts-alpine

WORKDIR /usr/src/app

COPY . ./

RUN yarn --no-progress --prod -s

CMD [ "node", "dev" ]

EXPOSE 3009
