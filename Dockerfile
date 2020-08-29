FROM node:latest AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:stable-alpine
COPY --from=build-stage /app/dist usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
