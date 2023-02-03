FROM node:alpine
WORKDIR /var/www/emptyup
COPY server/package.json .
RUN npm install && npm update
EXPOSE 3000
CMD [ "npm", "run", "dev" ]