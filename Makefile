.PHONY: build up down restart logs

build:
	docker-compose build

watch:
	docker-compose up

up:
	docker-compose up -d

dev-up:
	docker-compose -f docker-compose.dev.yml up --build --force-recreate

down:
	docker-compose down

re: build watch

logs:
	docker-compose logs -f