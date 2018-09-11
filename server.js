const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const register = require('./controller/register.js');
const login = require('./controller/login.js');
const image = require('./controller/image.js');
const profile = require('./controller/profile.js');

const db = knex({
	client: 'pg',
	connection: {
		host : '127.0.0.1', //localhost
		user : 'postgres',
		password : 'heshan0426',
		database : 'smart-brain'
	}
});

db.select('*').from('users').then(data=>{
	
})

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> { res.send("it is working") });
app.post("/login", login.handleLogin(db, bcrypt));
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get("/profile/:id", (req, res) => { profile.handleProfile(req, res, db) });
app.put("/image", (req, res)=>{ image.handleImage(req, res, db) });
app.post("/imageurl", (req, res) =>{image.handleApiCall(req, res)});

const PORT = process.env.PORT;
app.listen(PORT || 3000, ()=>{
	console.log('app started');
});