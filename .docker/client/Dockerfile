#client/Dockerfile

FROM node:14.11.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["yarn", "dev"]

#RUN yarn build
#CMD [ "yarn", "start" ]
