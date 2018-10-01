FROM node:alpine

COPY . app/

WORKDIR /app/

RUN npm i

EXPOSE 3002

ENTRYPOINT ["npm", "start"]
