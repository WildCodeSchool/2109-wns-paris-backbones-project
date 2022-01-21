# Awesome Project Build with TypeORM


New steps to run project !!!
DEV = docker-compose up --build
PROD = docker-compose -f docker-compose-dev.yml up --build


Steps to run this project:

1. Run `yarn` command
2. Create `admin` user in `ticketapp` database (in postgresql) :
3. Creer un mot de passe

```
createdb ticketapp
psql ticketapp
CREATE USER admin;
ALTER USER admin PASSWORD 'ticketapp_password';
```

4. Run `yarn seed:prod` command to seed prod environment
5. Run `yarn start` command
   if fail for a TS reason. Please don't give up.
   `yarn remove ts-node typescript`
   `yarn add ts-node typescript`
   `yarn start`
6. Run `yarn test` command will run test suite and create and seed the test db
