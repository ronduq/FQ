FROM node:10

# Set the environment variable PORT
ENV PORT=8080
ENV BASE_URL=https://teakorigin-data-api-v1.azurewebsites.net

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY / ./

RUN yarn install
# If you are building your code for production
# RUN npm install --only=production 

EXPOSE 8080
CMD [ "yarn", "start"]