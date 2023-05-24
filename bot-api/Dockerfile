FROM node:18-alpine3.16

WORKDIR /app

RUN printf '@1win:registry=http://fbet-gitlab.ex2b.co:4873/\n//fbet-gitlab.ex2b.co:4873/:_authToken="LNQ2AYp7C5OLh7H0kO0VLg=="\n' > .npmrc

COPY package*.json ./

RUN npm ci --only prod

COPY . .

CMD ["npm", "start"]