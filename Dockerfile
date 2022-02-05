FROM node:16.10.0 AS build-stage
WORKDIR /opt/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN npx ng build --configuration production


FROM nginx:1.19.6 AS deploy-stage
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /opt/app/dist/ .