FROM node:latest AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install -g @quasar/cli

RUN npm ci

COPY . .

RUN quasar build

FROM nginx:stable-alpine
COPY --from=build-stage /app/dist/spa usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
