#client/Dockerfile

FROM node:14.11.0-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["yarn", "dev"]

#CMD ["yarn", "build"]
#CMD ["yarn", "start"]
