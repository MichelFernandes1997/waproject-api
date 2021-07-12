# waproject-api

## Environment - step 1

### Create a .env in root of project and copy this variables:

#ENVIRONMENT
ENV=development

#SERVER
PORT=3333
URL=127.0.0.1

#DATABASE
MONGO_HOST=waproject-mongo
MONGO_PORT=27017
MONGO_DATABASE=wa-api
MONGO_USERNAME=wa-user-api
MONGO_PASSWORD=teste123api

### After that, save the file and go to next step

## Docker-compose

### Execute the command: docker-compose --env-file .env config

### Execute the command: docker-compose compose up -d
