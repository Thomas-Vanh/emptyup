#FROM node:16.17.1-alpine3.16 as build
#WORKDIR /usr/app
#COPY ./usr/app
#RUN npm ci
#RUN npm run build

FROM node:alpine
WORKDIR /var/www/emptyup
COPY server/package.json .
#COPY --from=build /usr/app/dist /usr/share/
RUN npm install && npm update
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
