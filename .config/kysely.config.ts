import {
	DummyDriver,
	PostgresAdapter,
	PostgresDriver,
	PostgresIntrospector,
	PostgresQueryCompiler,
} from 'kysely'
import { defineConfig } from 'kysely-ctl'
import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
	dialect: {
		createAdapter() {
			return new PostgresAdapter()
		},
		createDriver() {
			return new PostgresDriver({
				pool: new Pool({
					connectionString: process.env.DATABASE_URL
				}),
			})
		},
		createIntrospector(db) {
			return new PostgresIntrospector(db)
		},
		createQueryCompiler() {
			return new PostgresQueryCompiler()
		},
	},
	migrations: {
		migrationFolder: 'migrations',
	},
	plugins: [],
	seeds: {
		seedFolder: 'seeds',
	},
})
