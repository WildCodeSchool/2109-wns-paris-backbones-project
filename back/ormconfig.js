module.exports = [
	{
		"name": "prod",
		"type": "postgres",
		"host": "postgresDB",
		"port": 5432,
		"username": "postgres",
		"password": "postgres",
		"database": "ticketapp",
		"synchronize": true,
		"logging": false,
		"entities": [__dirname + "/{src,build}/entities/**/*.{ts,js}"],
		"migrations": [__dirname + "/{src,build}/migration/**/*.{ts,js}"],
		"subscribers": [__dirname + "/{src,build}/subscriber/**/*.{ts,js}"],
		"cli": {
			"entitiesDir": "**/entities",
			"migrationsDir": "**/migration",
			"subscribersDir": "**/subscriber"
		}
	},
 	{
		"name": "test",
		"open": true,
		"inTransaction": false,
		"readonly": false,
		"memory": false,
		"type": "better-sqlite3",
		"synchronize": true,
		"logging": false,
		"database": "test.db",
		"entities": [__dirname + "/{src,build}/entities/**/*.{ts,js}"],
		"migrations": [__dirname + "/{src,build}/migration/**/*.{ts,js}"],
		"subscribers": [__dirname + "/{src,build}/subscriber/**/*.{ts,js}"],
		"cli": {
			"entitiesDir": "**/entities",
			"migrationsDir": "**/migration",
			"subscribersDir": "**/subscriber"
		}
	}
]

