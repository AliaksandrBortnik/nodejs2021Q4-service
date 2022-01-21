# REST service

Note: If a function returns `void` or `Promise<void>`, no need to specific explicit @returns for TSDoc. Doc generator will infer types itself.

TS documentation is available in `/docs/index.html`.

## Setup steps
1. git clone https://github.com/AliaksandrBortnik/nodejs2021Q4-service/pull/2
2. Switch to `logging` branch.
3. Change directory `cd nodejs2021Q4-service`.
4. Install dependencies `npm i`.

5. To generate documentation, use `npm run doc`. Then open `docs` folder in the project, where you can find the result and open `index.html` in your browser.

6. To start the app, use `npm run start`.
7. If you want to run unit tests, start an app in one terminal, and open another terminal where `npm run test`.

8. To check lint, use `npm run lint`.

## Docker

Current main image is 291MB.

1. To start containers, run in the terminal the following: `npm run docker:start` or `docker-compose up --build`.
2. Basic containers shutdown: `npm run docker:stop`.
3. Shutdown and clean up of volumes: `docker-compose down --volumes`.

## Database and migrations
All available migrations are already generated and stored.
Keep in mind, migrations are applied automatically on application start-up. See `TYPEORM_MIGRATIONS_RUN` setting in .env file.

1. To generate migration, change host to `localhost` in .env and start docker containers and execute `docker exec -it rss-service npm run migration:generate`.
2. To run migrations, execute `docker exec -it rss-service npm run migration:run`.

## Logging & error handling
Keep in mind, a logger is encapsulated into a separate module `logger.ts` and injected into the fastify instance in `app.ts`. To track logs, it uses abstract logger interface of the fastify instance, e.g. `app.log.info(msg)` and so on. So we can replace the injected logger instance easily without need to change logging logic.

Log is available in `/logs/all.txt`, `/logs/error.txt` and also `console`.
To change logging level, go to `.env` and replace the value of `LOG_LEVEL`.

You can use one of:
- silent (no logs)
- fatal
- error
- warn
- info
- debug
- trace (includes all possible logs)
