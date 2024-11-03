FROM node:20-alpine

ARG PM2_PUBLIC_KEY
ARG PM2_SECRET_KEY

# ENV PM2_PUBLIC_KEY=$PM2_PUBLIC_KEY
# ENV PM2_SECRET_KEY=$PM2_SECRET_KEY

ENV PM2_PUBLIC_KEY qsl7si22y5au0vg
ENV PM2_SECRET_KEY 8qr4frg4t9qz90s

WORKDIR /app

# Install dependencies including git
RUN apk add --no-cache git

# Set the memory limit for Node.js
ENV NODE_OPTIONS="--max-old-space-size=4096"

COPY package*.json ./
COPY tsconfig.json ./
COPY . .

RUN yarn global add typescript pm2
RUN yarn install
RUN yarn add typescript@4.9.5 --save-dev
RUN yarn run tsc --incremental

# Define the command to run the app with PM2
CMD ["pm2-runtime", "start", "dist/src/entrova-web-api/api/index.js"]


# RUN yarn global add typescript pm2
# RUN yarn install
# RUN yarn add typescript@4.9.5 --save-dev
# RUN yarn run tsc --incremental



# FROM node:20-alpine

# ENV PM2_PUBLIC_KEY qsl7si22y5au0vg
# ENV PM2_SECRET_KEY 8qr4frg4t9qz90s

# WORKDIR /app

# # Install dependencies including git
# RUN apk add --no-cache git

# # Set the memory limit for Node.js
# ENV NODE_OPTIONS="--max-old-space-size=4096"

# COPY package*.json ./

# COPY tsconfig.json ./

# COPY . .

# RUN yarn global add typescript pm2

# RUN yarn install

# RUN yarn add typescript --save-dev

# RUN yarn run tsc --incremental

# # Expose the port the app runs on
# EXPOSE 2000

# # Define the command to run the app with PM2
# CMD ["pm2-runtime", "start", "dist/src/entrova-web-api/api/index.js", "--name", "entrova-web-services-dev"]