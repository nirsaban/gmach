FROM node:18.1-alpine AS build

WORKDIR /app
COPY package*.json .
RUN npm install --legacy-peer-deps

COPY . ./
RUN npm run build

FROM nginx:1.19-alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /use/share/nginx/html