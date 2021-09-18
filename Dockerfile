FROM node:15.2.1 as build

WORKDIR /app/
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production
COPY . /app
ARG API_URL="/api"
RUN REACT_APP_API_URL=${API_URL} GENERATE_SOURCEMAP=false yarn build

FROM nginx:1.19.7-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]
