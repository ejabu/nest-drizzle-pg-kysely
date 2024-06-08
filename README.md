# Nest Service

## How to run 

1. Setup the PostgreSQL, Nats, and Redis with the docker:
   ```sh
   docker-compose up -d
   ```

2. Copy `.env.example` to `.env`

3. Migrate the tables with this command:
   ```sh
   pnpm db:migrate
   ```

4. Install the dependencies:
   ```sh
   pnpm install
   ```

5. Run this service with this command:
   ```sh
   pnpm start
   ```
   or with watch mode
   ```sh
   pnpm start:dev
   ```

6. Your service will be served at [http://localhost:5555](http://localhost:5555)
