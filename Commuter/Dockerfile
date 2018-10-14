FROM node:alpine

COPY . app/

WORKDIR /app/

RUN npm install

EXPOSE 3003

ENTRYPOINT ["npm", "start"]