FROM node:12.18.1 AS build-stage
WORKDIR /opt/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN npx ng build --prod --aot


FROM nginx:1.19.6 AS deploy-stage
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /opt/app/dist/ .