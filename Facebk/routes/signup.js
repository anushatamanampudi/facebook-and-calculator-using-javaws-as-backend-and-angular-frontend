/**
 * 
 */
var mysql = require('./mysql');
exports.signup = function(req, res){
	var firstname = req.body.fname;
	var lastname = req.body.lname;
	var password = req.body.pwd;
	var emailId = req.body.mail1;
	//var gender=req.body.gender;
	var query = "SELECT UserId FROM users WHERE username = '"+emailId+"'";	
			console.log("Query is:"+query);
			mysql.fetchData(function(err,results){
				try{
					if (!err){	
						 console.log(results);
						 if(results.length > 0){
							 console.log("in if");
							  if(results[0].UserId > 0){					
								  res.status(500).json({"result":"", "error": true, "message": "This email id is already in use."});
							  }
						 }
						 else{
							 
							   var query = "INSERT INTO users (Username, Password,firstname,lastname)";
							  
							   
								query = query + "VALUES('" + emailId + "', '" + password + "', '" + firstname + "',' "+lastname+"')";	
								console.log("Query is:"+query);
								mysql.fetchData(function(err,results){
									try{
										if (!err){						
											  console.log("sign up successful");
											  res.send("The sign up is sucessfull please login above");
										  }
										  else{
											  console.log("signup failed");
											  res.status(500).json({"result":"", "error": true, "message": err});				  
										  }
									} catch(err){
										res.status(500).json({"result":"", "error": true, "message": err});
									}  
								},query);	
						 }
					  }
					  else{
						  console.log("signup failed");
						  res.status(500).json({"result":"", "error": true, "message": err});				  
					  }
				} catch(err){
					res.status(500).json({"result":"", "error": true, "message": err});
				}  
			},query);
		
	}