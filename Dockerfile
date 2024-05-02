FROM --platform=linux/amd64 node:18-alpine as builder
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY ./ ./
RUN npm run build

FROM --platform=linux/amd64 nginx
EXPOSE 3000
COPY conf_deploy/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder usr/src/app/build /usr/share/nginx/html
