APP_NAME=dynamic-quiz
IMAGE_NAME=$(APP_NAME)-image
CONTAINER_NAME=$(APP_NAME)-container
PORT=80

build:
        docker build -t $(IMAGE_NAME) .

up:
        docker run -d --name $(CONTAINER_NAME) -p $(PORT):80 $(IMAGE_NAME)

down:
        -docker stop $(CONTAINER_NAME)
        -docker rm $(CONTAINER_NAME)

clean:
        -docker stop $(CONTAINER_NAME)
        -docker rm $(CONTAINER_NAME)
        -docker rmi $(IMAGE_NAME)
        docker system prune -f
