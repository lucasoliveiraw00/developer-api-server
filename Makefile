include .env

ifeq ($(filter $(NODE_ENV), development production ),)
$(error Invalid NODE_ENV variable. Values accepteds: development or production.)
endif

DOCKER_COMPOSE_FILE=docker-compose.$(NODE_ENV).yml

ifeq ($(wildcard $(DOCKER_COMPOSE_FILE)),)
$(error $(DOCKER_COMPOSE_FILE) file not found.)
endif

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ Colors definitions                                                          │
# └─────────────────────────────────────────────────────────────────────────────┘
CR=\033[0;31m
CG=\033[0;32m
CY=\033[0;33m
CB=\033[0;36m
RC=\033[0m

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ API container commands                                                      │
# └─────────────────────────────────────────────────────────────────────────────┘
.PHONY: bash
bash:
  ifeq (production,$(NODE_ENV))
	  docker exec -it app sh
  endif

.PHONY: migrate
migrate:
  ifeq (production,$(NODE_ENV))
	  docker exec -it app sh -c "node ace migration:run"
  endif
  ifeq (development,$(NODE_ENV))
	  node ace migration:run
  endif

.PHONY: migrate-fresh
migrate-fresh:
  ifeq (production,$(NODE_ENV))
	  docker exec -it app sh -c "node ace migration:fresh"
  endif
  ifeq (development,$(NODE_ENV))
	  node ace migration:fresh
  endif

.PHONY: seed
seed:
  ifeq (production,$(NODE_ENV))
	  docker exec -it app sh -c "node ace db:seed"
  endif
  ifeq (development,$(NODE_ENV))
	  node ace db:seed
  endif

.PHONY: db-reset
db-reset:
	@make migrate-fresh
	@make seed
	@make restart

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ Infra commands                                                              │
# └─────────────────────────────────────────────────────────────────────────────┘
.PHONY: up
up:
  ifeq (production,$(NODE_ENV))
	  docker-compose -f $(DOCKER_COMPOSE_FILE) up -d
  endif
  ifeq (development,$(NODE_ENV))
	  docker-compose -f $(DOCKER_COMPOSE_FILE) up -d
	  yarn dev
  endif

.PHONY: down
down:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) down

.PHONY: build
build:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) up -d --build
	@docker-compose -f $(DOCKER_COMPOSE_FILE) down
  ifeq (development,$(NODE_ENV))
	  yarn install
  endif

.PHONY: restart
restart: down up

.PHONY: setup
setup:
  ifeq (production,$(NODE_ENV))
	@make up
  endif
  ifeq (development,$(NODE_ENV))
	  docker-compose -f $(DOCKER_COMPOSE_FILE) up -d
  endif
	@make migrate
	@make seed
	@make restart

.PHONY: app-logs
app-logs:
  ifeq (production,$(NODE_ENV))
	  docker-compose -f $(DOCKER_COMPOSE_FILE) logs
  endif

# ┌─────────────────────────────────────────────────────────────────────────────┐
# │ Help                                                                        │
# └─────────────────────────────────────────────────────────────────────────────┘
help:
	@echo ""
	@echo "${CY}Usage:${RC}"
	@echo "   make ${CG}<command>${RC}"
	@echo ""
	@echo "${CY}Infra commands:${RC}"
	@echo "${CG}   build                ${RC}Build all containers"
	@echo "${CG}   restart              ${RC}Restart all containers"
	@echo "${CG}   up                   ${RC}Start all containers"
	@echo "${CG}   down                 ${RC}Stop all containers"
	@echo "${CG}   setup                ${RC}Setup application"
	@echo "${CG}   app-logs             ${RC}List app container logs"
	@echo ""
	@echo "${CY}APP commands:${RC}"
	@echo "${CG}   bash                 ${RC}Open a bash terminal inside the APP container"
	@echo "${CG}   migrate              ${RC}Migrate database by running pending migrations"
	@echo "${CG}   migrate-fresh        ${RC}Drop all tables and re-migrate the database"
	@echo "${CG}   db-reset             ${RC}Drop all tables and re-migrate database and seeder"
	@echo "${CG}   seed                 ${RC}Make a new Seeder file"
	@echo ""
