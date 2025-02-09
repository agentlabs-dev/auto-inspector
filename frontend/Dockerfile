FROM node:22-alpine as build-stage

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run check

RUN npm run build

RUN npm prune --production

FROM node:22-alpine

WORKDIR /app

COPY --from=build-stage /app/build build/
COPY --from=build-stage /app/node_modules node_modules/
COPY package.json .

ENV NODE_ENV=production

CMD [ "sh", "-c", "node -r dotenv/config build" ]