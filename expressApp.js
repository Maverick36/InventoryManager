const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();

let conn = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'mike',
	password: 'mike1',
	database: 'InvManager'
});

conn.connect(function(err){
	if(!!err){
		console.log("Failed connection to DB!");
		console.log(err);
	}
	else{
		console.log("DB connection success!!");
	}
});

app.listen(3000,() => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '120mb'}));

app.get('/api',(request, response) =>{
	console.log("I got a request!!");
	console.log(request.query.username);
	let sql = "SELECT * FROM users WHERE username =?";
	conn.query(sql,request.query.username, function (err, result, fields) {
    if (err){
    	console.log(err);
    	response.json({
		status: 'fail',
		message: 'something went wrong or user not found!'
		});
    }else{
    	if(result.length > 0){
    		console.log(result);
    	response.json({
		status: 'success',
		message: 'User was found!',
		username: result[0].username,
		pass: result[0].password
		});
	
    	}
    	else{
    		console.log("USER NOT FOUND!");
    	response.json({
		status: 'fail',
		message: 'User was not found!'
		});
    	}
    } 
  });
});

app.get('/',(request, response)=>{
	console.log("INDEX REQUEST!");

	response.sendFile('index.html',{root: path.join(__dirname,'./public')});
});

app.get('/api/home',(request, response)=>{
	console.log("HOME REQUEST!");

	response.sendFile('home.html',{root: path.join(__dirname,'./public')});
});

app.get('/api/insert',(request, response)=>{
	console.log("INSERT REQUEST!");

	response.sendFile('add.html',{root: path.join(__dirname,'./public')});
});

app.get('/api/customer',(request, response)=>{
	console.log("Customer REQUEST!");
	
	response.sendFile('customer.html',{root: path.join(__dirname,'./public')});
});

app.post('/api/addCustomer',(request, response)=>{
	console.log("add customer REQUEST!");
	
	let name = request.query.name;
	let address = request.query.address;
	let phone = request.query.phone;
	let state = request.query.state;
	let city = request.query.city;
	let zipcode = request.query.zipcode;
	let business = request.query.businessType;
	let data = [name,address,state,city,zipcode,phone,business];
	
	let sql = "INSERT INTO customer (name,address,state,city,zipcode,phone,businessType) values(?,?,?,?,?,?,?)";
	conn.query(sql,data, function (err, result, fields) {
		if(err){
			console.log("failed inserting customer!!");
			console.log(err);
			response.json({
		status: 'failed',
		message: 'Customer was NOT Added!!',
		});
		}else{
			console.log("inserted customer!!!");
			response.json({
		status: 'success',
		message: 'Customer was Added!!',
		});
		}
		console.log(result);

	});
	

});