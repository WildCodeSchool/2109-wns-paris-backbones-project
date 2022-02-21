# Ticket App | Project Manager

The best ways to manage all your projects. JIRA and ASANA suck.

## DESKTOP
### Installation - dev
#### Follow those steps to run the project

Make sure you have .env files in the /back folder

Make sure you are at the origin of the folder and run:
```bash
docker-compose -f docker-compose-dev.yml up --build
```
Back: http://localhost:4000/

Front: http://localhost:3000/


### Installation - prod
#### Follow those steps to run the project

Make sure you have .env files in the /back folder

```bash
docker-compose up --build
```


## MOBILE

### Installation - mobile
#### Follow those steps to run the project


Run these commands to install mobile dependencies
```bash
cd mobile
yarn
```

 Start the dev mobile app :
```bash
yarn start
```

Don't forget to start the back dev server as well
```bash
# at the root of the project
# Don't forget to add the .env files

docker-compose -f docker-compose-dev.yml up --build
```

## Tests

Make sure you have .env files!

### Back and Front tests are launched with github actions for validate each Pull Request
#### To launch tests:
```bash
yarn test
```
#### To launch tests with coverage:
```bash
yarn test:coverage
```

## Stacks
### Back
Node.js | TypeScript | Typeorm | TypeGraphql
### Front
React | TypeScript | Tailwind | Vite
### DataBase
Postgresql | BetterSqlite3
### test
Jest
### CI
Docker