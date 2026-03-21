.PHONY: logs down up rebuild shell

logs:
	docker logs -f app

down:
	docker compose down

up:
	docker compose up -d

restart:
	docker compose restart

rebuild:
	docker compose up -d --build
