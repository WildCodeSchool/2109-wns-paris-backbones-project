export default [
	{
		name: "prod",
		type: "postgres",
		host: "localhost",
		port: 5432,
		username: "admin",
		password: "ticketapp_password",
		database: "ticketapp",
		synchronize: true,
		logging: false,
		entities: ["src/entities/**/*.ts"],
		migrations: ["src/migration/**/*.ts"],
		subscribers: ["src/subscriber/**/*.ts"],
		cli: {
			entitiesDir: "src/entities",
			migrationsDir: "src/migration",
			subscribersDir: "src/subscriber",
		},
	},
	{
		name: "test",
		type: "postgres",
		host: "localhost",
		port: 5432,
		username: "admin",
		password: "ticketapp_password",
		database: "ticketapp2",
		synchronize: true,
		logging: false,
		entities: ["src/entities/**/*.ts"],
		migrations: ["src/migration/**/*.ts"],
		subscribers: ["src/subscriber/**/*.ts"],
		cli: {
			entitiesDir: "src/entities",
			migrationsDir: "src/migration",
			subscribersDir: "src/subscriber",
		},
	},
];

// export default [
// 	{
// 		type: "postgres",
// 		host: "localhost",
// 		port: 5432,
// 		username: "admin",
// 		password: "ticketapp_password",
// 		database: "ticketapp",
// 		synchronize: true,
// 		logging: false,
// 		entities: ["src/entities/**/*.ts"],
// 		migrations: ["src/migration/**/*.ts"],
// 		subscribers: ["src/subscriber/**/*.ts"],
// 		cli: {
// 			entitiesDir: "src/entities",
// 			migrationsDir: "src/migration",
// 			subscribersDir: "src/subscriber",
// 		},
// 	},
// ];
