FROM node:22-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production Image
FROM node:22-alpine
WORKDIR /app

# Install only production dependencies
COPY package*.json ./

RUN npm install --only=production

# Mandatory to run the worker thread
RUN npm install ts-node

# Copy built files from the build stage
COPY --from=build-stage /app/dist ./dist

ENV NODE_ENV=production

CMD ["node", "dist/interfaces/api/main.js"] 