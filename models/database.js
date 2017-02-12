const pg = require('pg');
pg.defaults.ssl = true;
const connectionString = process.env.DATABASE_URL;

const client = new pg.Client(connectionString);
client.connect();

const query = client.query(

	'CREATE TABLE IF NOT EXISTS items(id SERIAL PRIMARY KEY, todo VARCHAR(400) not null, iscomplete BOOLEAN)'
	);

query.on('end', () => {
	client.end();
});
