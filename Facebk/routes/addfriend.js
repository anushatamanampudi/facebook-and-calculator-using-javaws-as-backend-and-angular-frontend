/**
 * New node file
 */
var mysql = require('./mysql');

var name;
var myname;
var userid;
var frnduserid;

exports.addfriend = function(req, res){
  name=req.body.fname;
  myname=req.fbsession.firstname;
  
  
};

exports.checkfrnd = function(req, res){
	
	
	
	  name=req.body.fname;
	  myname=req.fbsession.firstname;
	  var user="SELECT UserId from users where firstname='" + name + "';";
	  
	  var myuserid="SELECT UserId from users where firstname='" + myname + "';";
	  

	  mysql.fetchData(function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results.length > 0)
				{
					console.log(results[0].UserId);
					userid=results[0].UserId;
				}
				
		    }  
		},myuserid);
		 mysql.fetchData(function(err,results){
				if(err){
					throw err;
				}
				else 
				{
					if(results.length > 0)
					{    
						frnduserid=results[0].UserId;
						
						var  frndstatus="Select status from friends where useridmine='" + frnduserid + "' and useridfrnd='" + userid + "' union Select status from friends where useridmine='" + userid + "' and useridfrnd='" + frnduserid + "';";
						mysql.fetchData(function(err,results1){
							if(err){
								throw err;
							}
							else 
							{   
								if(results1.length > 0){
									console.log("out")
								//console.log(results1[0].status)
								res.send(results1[0].status);
								}
								else{
									res.send("4");
								}
						    }  
						},frndstatus);
						
						
					}
					else
						{
						console.log("no record found");
						
						}
				}  
			}, user);
	  
	
	
	
	
	
	
	
	
	
};