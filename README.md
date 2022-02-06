# Board REST service

## Instructions
1. Install dependencies `npm i`.
2. To start the apps in docker, use `npm run docker:start`.
3. If you want to run unit tests, open another terminal where `npm run test:auth`.
4. To check lint, use `npm run lint`.
5. To generate documentation, use `npm run doc`. Then open `docs` folder in the project, where you can find the result and open `index.html` in your browser.

## Docker
Current main image is 291MB.

1. To start containers, run in the terminal the following: `npm run docker:start` or `docker-compose up --build`.
2. Basic containers shutdown: `npm run docker:stop`.
3. Shutdown and clean up of volumes: `docker-compose down --volumes`.

## Database and migrations
All available migrations are already generated and stored.
Keep in mind, migrations are applied automatically on application start-up. See `TYPEORM_MIGRATIONS_RUN` setting in .env file.

1. To generate migration, start docker containers and execute `docker exec -it rss-service npm run migration:generate`.
2. To run migrations, execute `docker exec -it rss-service npm run migration:run`.

## Documentation
TS documentation is available in `/docs/index.html`.

## Logging & error handling
Logs are available in docker volume `logs` and also `console`.
To change logging level, go to `.env` and replace the value of `LOG_LEVEL`.

You can use one of:
- silent (no logs)
- fatal
- error
- warn
- info
- debug
- trace (includes all possible logs)
