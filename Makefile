logs:
	docker logs -f app

down app:
	docker compose down

start app:
	docker compose up -d
