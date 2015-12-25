/**
 * New node file
 */
var mysql = require('./mysql');

exports.post=function(req,res){
	var text=req.body.text;
	var user="SELECT UserId from users where firstname='" + req.fbsession.firstname + "';";
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0)
			{    
				var upd="INSERT INTO updates(post,useridfk,groupidfk,firstname) values ('" +text+ "','" + results[0].UserId + "',NULL,'" +req.fbsession.firstname+ "');";
				
				mysql.fetchData(function(err,r){
					if(err){
						
						throw err;
					}
					else 
					{
						json_response={"statusCode":200};
						res.send(json_response);
					}  
				}, upd);
			}
			else
				{
				console.log("no record found");
				}
		}  
	}, user);
}

