FROM node:18-alpine3.16 as build
WORKDIR /usr/app
COPY ./client /usr/app
RUN npm ci
RUN npm run build

FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/build /usr/share/nginx/html

#FROM node:alpine
#WORkDIR /var/www/emptyup
#COPY client/package.json .
#RUN npm install && npm update
#EXPOSE 3000
#CMD [ "npm", "run", "start" ]
