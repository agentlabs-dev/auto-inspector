.PHONY: build up down restart logs

build:
	docker-compose build

watch:
	docker-compose up

up:
	docker-compose up -d

down:
	docker-compose down

re: build watch

logs:
	docker-compose logs -f