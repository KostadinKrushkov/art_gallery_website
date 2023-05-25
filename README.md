# Rumen Plamenov art gallery REST API
_Visit [rumenplamenovart.com](https://rumenplamenovart.com/) to see final result_

This repo is the UI for the art gallery website
To view the REST API code and database, you can visit https://github.com/KostadinKrushkov/art_gallery_backend

Version 1.4

Technologies used for this project
- Frontend Development: Angular (Typescript), HTML, CSS
- Backend Development: Python3 + Flask + SQLAlchemy
- SQL server + SQL Management Studio
- Docker + docker-compose
- Testing: mostly integration tests with pytest, and some unit testing

---

# Deployment
_to build the image with version and attach it to docker hub so it can be downloaded_

docker build -f .\Dockerfile.frontend -t rocazzar/rumen-plamenov-angular-app:v1.4 .

_to tag the image_

docker tag rocazzar/rumen-plamenov-angular-app:v1.4 rocazzar/rumen-plamenov-angular-app:v1.4-release

_to push the tagged image to docker hub_

docker push rocazzar/rumen-plamenov-angular-app:v1.4-release

_to run the UI in a container locally_

docker run -d -it -p 127.0.0.1:443:443/tcp --name rumen-plamenov-angular-app rocazzar/rumen-plamenov-angular-app:latest

