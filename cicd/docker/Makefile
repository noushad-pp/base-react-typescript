# Generated automatically by generator-cicd-pipeline
# DO NOT EDIT MANUALLY

MAKEFLAGS =+ -rR --warn-undefined-variables

.PHONY: docker-build docker-tag docker-push

include cicd/docker/variables.mk
export

docker-build:
	docker pull ${DOCKER_IMAGE}:${VERSION} || docker pull ${DOCKER_IMAGE}:latest || echo "No cache available"
	docker build \
	  --cache-from ${DOCKER_IMAGE}:latest \
	  --cache-from ${DOCKER_IMAGE}:${TAG} \
	  -t ${DOCKER_IMAGE}:${TAG} \
	  -f cicd/docker/Dockerfile .

docker-tag:
	docker tag ${DOCKER_IMAGE}:${TAG} ${DOCKER_IMAGE}:${VERSION}
	docker tag ${DOCKER_IMAGE}:${TAG} ${DOCKER_IMAGE}:latest

docker-push:
	docker push ${DOCKER_IMAGE}
