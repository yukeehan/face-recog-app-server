const handleLogin = (db, bcrypt)=> (req, res)=>{
	const { email, password } = req.body;
	if(!email || !password){
		return res.status(400).json('login failed');
	}
	db.select('email','hash').from('login')
	.where('email', '=', email)
	.then(data=>{
		const isValid = bcrypt.compareSync(password, data[0].hash)
		if(isValid) { 
			return db.select('*').from('users')
			.where('email', '=', email)
			.then(data=>{
				res.json(data[0]);
			})
		} else{
			res.status(400).json('not match');
		}
	})
	.catch(err=>{
		res.status(400).json('something went wrong');
	})
}

module.exports = {
    handleLogin: handleLogin
}