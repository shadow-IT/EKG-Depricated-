FROM node:alpine

COPY . app/

WORKDIR /app/

RUN npm install

EXPOSE 3004

ENTRYPOINT ["npm", "start"]