export

.PHONY: develop formatting install start build prettier test coverage lint tsc gzip

develop:
	@yarn develop

formatting:
	@yarn prettier --trailing-comma=es5 --single-quote=true --semi=true --print-width=120 --arrow-parens=always --write \"{./,./mock-api/**,./src/**}/*.{d.ts,js}\"
	@yarn prettier --write \"{./,./mock-api/**,./src/**}/*.{md,scss,json,yml}\"

install:
	@yarn install --frozen-lockfile

start: ## start application in development mode
	@yarn start

build: ## build production version of the application
	@yarn build

prettier: ## fix es-lint and prettier
	@yarn lint:fix

test: ## execute test in watch mode
	@yarn test

coverage: ## build test coverage
	@yarn test -- --coverage

lint:
	@yarn lint

tsc:
	@yarn tsc

gzip: ## prepares gziped files for nginx gzip_static
	find build -type f -exec test ! -e {}.gz \; -print0 | xargs -r -0 gzip -k -9
