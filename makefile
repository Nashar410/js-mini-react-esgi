#### Utilisation : make [COMMAND]
#### example : make start

start:
	docker-compose up -d --build
stop:
	docker-compose down

refresh:
	make stop
	make start