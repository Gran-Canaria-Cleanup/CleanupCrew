FROM node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Use other port if not using https
EXPOSE 80

# ATTENTION!!! DANGER!!! THIS WILL RESET XREATE DATABASE. Use it only if you know what you are doing.
#ENTRYPOINT [ "npm", "run", "db:reset-and-start" ]

# This is the normal use Entry point. Comment this line for the installation, and afterwards uncomment it forever.
#ENTRYPOINT [ "npm", "run", "db:migrate-and-start" ]

ENTRYPOINT [ "node", "server.js" ]