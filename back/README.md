# Awesome Project Build with TypeORM

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

4. Run `yarn seed` command
5. Run `yarn start` command
