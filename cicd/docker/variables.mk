# Generated automatically by generator-cicd-pipeline
# DO NOT EDIT MANUALLY

APPLICATION_NAME = cockpit-frontend

ifdef CI
	ifdef CI_COMMIT_TAG
		# Tag CI pipeline
		ENVIRONMENT ?= prod
		DOCKER_IMAGE_HOST = dcr.mfb.io
		VERSION = ${CI_COMMIT_TAG}
		TAG = ${CI_COMMIT_TAG}
	else
		# Commit CI pipeline
		ENVIRONMENT = stg
		DOCKER_IMAGE_HOST = ci-dump-dcr.mfb.io
		VERSION = ${CI_COMMIT_SHA}
		TAG = ${CI_PIPELINE_ID}
	endif
else
	# Commit CI pipeline
	ENVIRONMENT = dev
	DOCKER_IMAGE_HOST=localhost
	VERSION = latest
	TAG = ${VERSION}
endif

DOCKER_IMAGE=${DOCKER_IMAGE_HOST}/illuminati/prod/${APPLICATION_NAME}
