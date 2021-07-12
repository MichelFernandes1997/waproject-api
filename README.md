# waproject-api - running on Docker

## Environment - step 1

### Create a .env in root of project and copy this variables:

ENV=development

PORT=3333

MONGO_HOST=waproject-mongo

MONGO_PORT=27017

MONGO_DATABASE=wa-api

MONGO_USERNAME=wa-user-api

MONGO_PASSWORD=teste123api

### After that, save the file and go to next step

## Docker-compose - step 2

### Execute the command: docker-compose --env-file .env config

### Execute the command: docker-compose up -d

## Observation:

## Always before execute the command "docker-compose up -d" you need execute the command "docker-compose --env-file .env config"

### If an error ocurred in this proccess, execute the command "docker-compose down" and make the "step - 2" again
