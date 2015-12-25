/**
 * New node file
 */

var mysql = require('./mysql');
var ejs = require('ejs');
var narr =[];
exports.creategroup = function(req, res){
	
res.render('creategroup');	
	
	
	
	
};
exports.groupcreation = function(req, res){
	//console.log("hello"+req.param("input1"));
	req.fbsession.grpname=req.param("input1");
	query= "INSERT INTO groups(groupname,adminfirstname) values ('" +req.param("input1")+ "','" +req.fbsession.firstname+ "');";
	mysql.fetchData(function(err,r){
		if(err){
			throw err;
		}
		else 
		{
			var u="SELECT UserId from users where firstname='" + req.fbsession.firstname + "';";
			 mysql.fetchData(function(err,result){
					if(err){
						throw err;
					}
					else 
					{
						if(result.length > 0)
						{
						 
							uid=result[0].UserId;
							q="SELECT firstname from users where UserId IN (SELECT useridmine from friends where useridfrnd='" +uid+ "' and status='2' union SELECT useridfrnd from friends where useridmine='" +uid+ "' and status='2');";
							mysql.fetchData(function(err,resul){
								if(err){
									throw err;
								}
								else 
								{   
									if(resul.length > 0)
									{
										var farr = [];
										
										
										for(var i=0;i < resul.length ;i++){
											
											farr.push(resul[i].firstname);
										}
										narr=farr;
										var u1="INSERT into grpmem(grpname,grpmemfirstname)values('" +req.fbsession.grpname+ "','" +req.fbsession.firstname+ "');";
									    mysql.fetchData(function(err,r){
											if(err){
												throw err;
											}
											
									}, u1);
										//console.log(req.body.input);
										 res.render('groupform',{grpname:req.param("input1"),farr:farr} );
										
										
								    }
									else
										{
										console.log("no frnds record found");
										//res.send("success");
										 res.render('groupform',{grpname:req.param("input1"),farr:[]});
								          }
								}  
							}, q);
						}
						else
							{
							console.log("no userid record found");
							}
					}  
				
			   
	}, u);

		}
	},query);
	
	
	
};


exports.addmem = function(req, res){
	
	memname=req.body.id;
	var u="INSERT into grpmem(grpname,grpmemfirstname)values('" +req.fbsession.grpname+ "','" +memname+ "');";
	 mysql.fetchData(function(err,result){
			if(err){
				//res.send("member alredy added");
				//res.error(err);
				//console.log("error");
				
				//console.log(err);
				
				
			}
			else 
			{   
				
				json_response={"statusCode":200};
				res.send(json_response);		
				
			}
		}, u);
		
		
		
		
	};
	
exports.showmem = function(req, res){
		
		
		var u="select grpmemfirstname from grpmem where grpname='" +req.fbsession.grpname+ "';";
		 mysql.fetchData(function(err,results){
				if(err){
					throw err;
				}
				else 
				{
					if(results.length > 0)
					{
						var mem=[];
				       for(var i=0;i<results.length;i++){
				    	   mem.push(results[i].grpmemfirstname);
				       }
						console.log(mem[0]);
						res.send(JSON.stringify(mem));
						
						
				    }
					else{
						console.log("no members in the group");
					}
				}
			}, u);
			
			
			
			
		};
	
		exports.del = function(req, res){
			
			memname=req.body.id;
			console.log(memname);
			console.log(req.fbsession.grpname);
			var u="DELETE from grpmem where grpname='" +req.fbsession.grpname+ "' and grpmemfirstname='" +memname+ "';";
			 mysql.fetchData(function(err,result){
					if(err){
						//res.send("member alredy added");
						//res.error(err);
						//console.log("error");
						
						//console.log(err);
						throw err;
						
					}
					else 
					{   
						
						res.send("sucess");		
						
					}
				}, u);
				
				
				
				
			};		

			
exports.groupdeletion = function(req, res){
				//console.log("hello"+req.param("input1"));
				//req.fbsession.grpname=req.param("input2");
	            query1 = "Delete from grpmem where grpname = '" +req.body.id+ "';";
				query= "Delete from groups where groupname = '" +req.body.id+ "' and adminfirstname = '" +req.fbsession.firstname+ "';";
				mysql.fetchData(function(err,r){
					if(err){
						connection.release();
				        throw err;
						
					}
					else 
					{
						mysql.fetchData(function(err,r1){
							if(err){
								connection.release();
						          throw err;
								
							}
							else 
							{  if(r1.length>0){
								res.send("success");
						     }  
							else
								{
								  res.send("You have no groups registered")
								}
							
							}
									
					

							
						},query);
						
				     }  
							
			

					
				},query1);
				
				
				
			};
			
exports.showgrps = function(req, res){
				
				
				var u="select groupname from groups where adminfirstname='" +req.fbsession.firstname+ "';";
				 mysql.fetchData(function(err,results){
						if(err){
							throw err;
						}
						else 
						{
							if(results.length > 0)
							{
								var grp=[];
						       for(var i=0;i<results.length;i++){
						    	   grp.push(results[i].groupname);
						       }
								console.log(grp[0]);
								res.send(JSON.stringify(grp));
								
								
						    }
							else{
								res.send("You have no groups");
							}
						}
					}, u);
					
					
					
					
				};
			