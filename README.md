# Eirene

Api that provides only news that you want from another algolia Api

## Getting Started

Starting with the project it is necessary to have the following libraries.

### Prerequisites

```
node: v11.6.0
npm: 6.5.0-next.0
docker: 18.09.7
docker-compose: 1.17.1
```

### Installing

For installation, follow the step below

```
>> npm install
```

### Set Enviroment Variables

Before run the server, it is neccesary filling the enviroment file. The .env is used to use in the development mode, while .env.docker is used in the building the images.

## Populate database

For the first data population you need to run the next command:

```
>> npm run populate
```

## Running the server

For run the server, you need to run the next command:

```
>> npm start
```

After that, you can check in the http://localhost:3001

## Running the tests

Running unit tests such as integration tests, it is necessary to execute the following command

```
>> npm run test
```

### And coding style tests

For the code styles is following the airbnb guide. Although you can run the next command

```
>> npm run pretest
```

## Deployment

For the deployment you can execute the docker commands to create the image and container with the nexts steps. Before those commands, you need to fill the enviroments file[.env.docker]

### Images Creation

```
>> docker-compose build
```

### Container Creation in background

```
>> docker-compose up -d
```

## Usage

For using the api, it is neccesary definning the endpoints

#### GET /api/news?page=<page_number>

#### GET /api/news?page=1

Response status code: 200
Response body:

```
{
    "status": "success",
    "page": 1,
    "total": 5,
    "news": [
        {
            "isActive": true,
            "_id": "5d9bbc342d93292daff8c422",
            "objectID": "21186312",
            "author": "mmcclure",
            "createdAt": "2019-10-07T21:48:38.000Z",
            "storyTitle": "",
            "title": "Is Guy Fieri in Your Node.js Packages?"
        },
        {
            "isActive": true,
            "_id": "5d9bbc342d93292daff8c423",
            "objectID": "21185793",
            "author": "scottlocklin",
            "createdAt": "2019-10-07T20:48:14.000Z",
            "storyTitle": "R is a joy if you treat it like Awk",
            "title": ""
        },
        {
            "isActive": true,
            "_id": "5d9bbc342d93292daff8c424",
            "objectID": "21185315",
            "author": "trust07007707",
            "createdAt": "2019-10-07T20:00:12.000Z",
            "storyTitle": "New chips for machine intelligence",
            "title": ""
        },
        {
            "isActive": true,
            "_id": "5d9bbc342d93292daff8c425",
            "objectID": "21185192",
            "author": "stephenr",
            "createdAt": "2019-10-07T19:48:23.000Z",
            "storyTitle": "A Multithreaded fork of Redis that is 5X Faster than Redis",
            "title": ""
        },
        {
            "isActive": true,
            "_id": "5d9bbc342d93292daff8c426",
            "objectID": "21178834",
            "author": "esamsonov",
            "createdAt": "2019-10-07T09:13:45.000Z",
            "storyTitle": "Ask HN: Who wants to be hired? (October 2019)",
            "title": ""
        }
    ]
```

#### DELETE /api/news/<object_id>/

#### DELETE /api/news/5d9bbc342d93292daff8c426/

Response status code: 204

Response body: NO CONTENT
