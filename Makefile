build: 
	sam build

run:
	sam local start-api

deploy:
	sam deploy

test:
	npm test