# Ticket App | Project Manager

The best ways to manage all your projects. JIRA and ASANA sucks.

## Installation - dev
### Follow those steps to run the project

Make sure you are at the origin of the folder and run:
```bash
docker-compose -f docker-compose-dev.yml up --build
```
Back: http://localhost:4000/

Front: http://localhost:3000/


## Installation - prod
### Follow those steps to run the project
```bash
docker-compose up --build
```


## Stacks
### Back
Node.js | TypeScript | Typrorm | TypeGraphql
### Front
React | TypeScript | Tailwind | Vite
### DataBase
Postgresql | BetterSqlite3
### test
Jest
### CI
Docker