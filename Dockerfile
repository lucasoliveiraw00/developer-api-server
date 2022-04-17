ARG NODE_IMAGE=node:16.14-alpine

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init
RUN mkdir -p /app && chown node:node /app
WORKDIR /app
USER node
RUN mkdir tmp

FROM base AS dependencies
COPY ./yarn.lock ./
COPY ./package*.json ./
RUN yarn
COPY --chown=node:node . .

FROM dependencies AS build
RUN node ace build --production

FROM base AS production
ENV NODE_ENV=production
ENV PORT=$PORT
ENV HOST=$HOST
COPY ./yarn.lock ./
COPY ./package*.json ./
RUN yarn install --production
COPY --chown=node:node --from=build /app/build .
EXPOSE $PORT
CMD [ "dumb-init", "node", "server.js" ]
