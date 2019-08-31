# replace the below fields with values corresponding with your project
ifdef CI
	# Pipeline
	ifdef CI_COMMIT_TAG
		# Production
		REACT_APP_BACKEND_URI = https://backend.com
		REACT_APP_VERSION = ${CI_COMMIT_TAG}
	else
		# Staging
		REACT_APP_BACKEND_URI = https://backend.com
		REACT_APP_VERSION = ${CI_COMMIT_SHA}
	endif
else
	# Local
	REACT_APP_VERSION = latest
	REACT_APP_BACKEND_URI = https://localhost:5000
endif

REACT_APP_TITLE = ATKearney Digital Portfolio
