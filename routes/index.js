const express = require('express');
const router = express.Router();
const pg = require('pg');
pg.defaults.ssl = true;
const path = require('path');
const connectionString = process.env.DATABASE_URL;


//adding the todo routes - first the CREATE
router.post('/api/v1/todos', function(req, res, next){
	const results = [];
	//get the data from http request
	const data = {todo: req.body.todo, iscomplete: false};

	//get a postgres client from the connection pool
	pg.connect(connectionString, function(err, client, done){
		//handle connection errors
		if(err){
			done();
			console.log(err);
			return res.status(500).json({success:false, data:err});
		}
		//SQL Query -> insert the data
		client.query('INSERT into items(todo, iscomplete) values ($1, $2)',
			[data.todo, data.iscomplete]);
		//SQL Query -> select data to return
		const query = client.query('SELECT * from items ORDER BY iscomplete, id ASC');
		//stream results back one row at a time
		query.on('row', function(row){
			results.push(row);
		});
		//after all data is returned, close connection and push results
		query.on('end', function(){
			done();
			return res.json(results);
		});
	});
});

//now the READ all todos api
router.get('/api/v1/todos', function(req, res, next) {
	const results = [];

	//create a postgres client from the connection pool
	pg.connect(connectionString, function(err, client, done){
		//handle connection errors
		if(err){
			done();
			console.log(err);
			return res.status(500).json({success:false, data:err});
		}
		//SQL query, get all the results
		const query = client.query('SELECT * from items ORDER BY iscomplete, id ASC');
		//stream results back one row at a time
		query.on('row', function(row){
			results.push(row);
		});
		//after all data is returned, close connection and push results
		query.on('end', function(){
			done();
			return res.json(results);
		});
	});
});

//UPDATE a single todo
router.put('/api/v1/todos/:id', function(req, res, next) {

	const results = [];
	//grab the id from the URL parameters

	const id = req.params.id

	//grab the data from the http request
	const data = {todo: req.body.todo, iscomplete: req.body.iscomplete};

	//get a postgres client from the connection pool
	pg.connect(connectionString, function(err, client, done){
		//handle connection errors
		if(err){
			done();
			console.log(err);
			return res.status(500).json({success:false, data:err});
		}
		//UPDATE the data
		client.query('UPDATE items SET todo=($1), iscomplete=($2) WHERE id = ($3)',
			[ data.todo, data.iscomplete, id ]);

		//SQL query to query the data
		const query = client.query('SELECT * from items ORDER BY iscomplete, id ASC');
		//stream results back one at a time (only one should exist)
		query.on('row', function(row){
			results.push(row);
		});
		//after all data is returned, send results
		query.on('end', function(){
			done();
			return res.json(results);
		});
	});
});

//DELETE API
router.delete('/api/v1/todos/:id', function(req, res, next) {

	const results = [];

	//grab the id from the parameters
	const id = req.params.id;

	//grab a connection from the postgres connection pool
	pg.connect(connectionString, function(err, client, done){
		//handle connection errors
		if(err){
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}

		//DELETE the data
		client.query('DELETE from items where id = ($1)', [id]);

		//SQL query to query the data
		const query = client.query('SELECT * from items ORDER BY iscomplete, id ASC');
		//stream results back one at a time (only one should exist)
		query.on('row', function(row){
			results.push(row);
		});
		//after all data is returned, send results
		query.on('end', function(){
			done();
			return res.json(results);
		});
	});
});

/* GET home page and other routes. */
router.get('/', function(req, res) {
  res.sendFile('index.html');
});

module.exports = router;
