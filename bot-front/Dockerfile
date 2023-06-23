FROM node:18.12.1-alpine as builder
RUN npm i --force -g npm
RUN mkdir -p /src/app/
COPY ./package.json ./package-lock.json /src/app/
WORKDIR src/app/
RUN npm i --force
COPY ./ /src/app
RUN npm run build

FROM nginx:alpine
COPY --from=builder /src/app/dist /bot-front
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

