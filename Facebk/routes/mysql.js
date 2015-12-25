/**
 * 
 */

var ejs= require('ejs');
var mysql = require('mysql');
var arrayOfPools= [];
var Queue = [];
var max = 2000; 
var j = 0;

function getConnection(){
	var connection = mysql.createConnection({
	    host     : 'localhost',
	    user     : 'anusha',
	    password : 'anusha',
	    database : 'facebook',
	    port	 : 3306
	});
	return connection;
}
/*
for(var i=0;i< max; i++){
	var connection=getConnection();
	arrayOfPools.push(connection);
}
function getConnectionFromPool(){
	var connection = arrayOfPools.pop();
	return connection;
}
function releaseConnectionFromPool(connection){
	arrayOfPools.push(connection);
}*/
function fetchData(callback,sqlQuery){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	/*if(getConnectionFromPool().length == 0){
		Queue.push(sqlQuery);
	}*/
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	
}	

exports.fetchData=fetchData;