FROM node:20-alpine

WORKDIR /app

# Install dependencies including git
RUN apk add --no-cache git

# Set the memory limit for Node.js
ENV NODE_OPTIONS="--max-old-space-size=4096"

COPY package*.json ./
COPY tsconfig.json ./
COPY . .

RUN yarn global add typescript
RUN yarn install
RUN yarn add typescript@4.9.5 --save-dev
RUN yarn run tsc --incremental

# Define the command to run the app with PM2
CMD ["yarn", "start"]
