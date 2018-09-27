FROM node:alpine

COPY . app/

WORKDIR /app/

RUN npm i

EXPOSE 3001

ENTRYPOINT ["npm", "start"]
