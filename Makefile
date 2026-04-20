# Makefile for Study Tracker

# Variables
PM := pnpm
PRISMA := npx prisma

# --- Development ---

.PHONY: dev
dev: ## Run the development server
# 	run docker container for db
	docker compose up -d
	$(PM) run dev

.PHONY: build
build: ## Build the production application
	$(PM) run build

.PHONY: start
start: ## Start the production application
	$(PM) run start

.PHONY: lint
lint: ## Run ESLint
	$(PM) run lint

# --- Database ---

.PHONY: db-generate
db-generate: ## Generate Prisma Client
	$(PRISMA) generate

.PHONY: db-push
db-push: ## Sync the Prisma schema with the database (no migration files)
	$(PRISMA) db push

.PHONY: db-migrate
db-migrate: ## Create and apply a new migration
	$(PRISMA) migrate dev

.PHONY: db-studio
db-studio: ## Open Prisma Studio
	$(PRISMA) studio

.PHONY: db-status
db-status: ## Check database connection and migration status
	$(PRISMA) migrate status

.PHONY: db-fix
db-fix: ## Restart docker-compose and check db (runs scripts/db-fix.sh)
	chmod +x scripts/db-fix.sh
	./scripts/db-fix.sh

# --- Utilities ---

.PHONY: install
install: ## Install dependencies
	$(PM) install

.PHONY: help
help: ## Display this help screen
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
