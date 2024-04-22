### STAGE 1 : Build ###
# Use official node image as the base image
FROM node:18.14.2-alpine AS build

LABEL project-name="angular-ddd-template"

RUN apk update

# Set the working directory
WORKDIR /home/angular-ddd-template

# Add the source code to app
COPY package*.json /home/angular-ddd-template/

# Install all the dependencies
RUN npm install

COPY . .

# Generate the build of the application
RUN npm run build

### STAGE 2 : Execution ###
# Serve app with nginx server
# Use official nginx image as the base image
FROM nginx:1.20.1-alpine

# Copy the build output to replace the default nginx contents.
COPY configs/nginx.conf /etc/nginx/nginx.conf.template
COPY --from=build /home/angular-ddd-template/dist/angular-ddd-template /usr/share/nginx/html

CMD [ "/bin/sh", "-c", "envsubst '$$AVA_API_URL' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]


