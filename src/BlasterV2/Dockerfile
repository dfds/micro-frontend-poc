FROM node:latest

WORKDIR app

COPY ./package.json ./
COPY ./webpack.config.js ./
COPY ./tsconfig.json ./
COPY ./src ./src
COPY ./view ./view

RUN npm install --no-progress --ignore-optional
RUN npm run sass-render

CMD npm run webpack-serve