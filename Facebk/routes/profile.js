/**
 * New node file
 */
var mysql = require('./mysql');
exports.profile = function(req, res) {
	
	var u1="SELECT UserId from users where firstname='" + req.fbsession.firstname + "';";
	 mysql.fetchData(function(err,result){
			if(err){
				throw err;
			}
			else 
			{
				if(result.length > 0)
				{
				 
					uid=result[0].UserId;
					console.log("user id "+uid);
					query="SELECT firstname from users where UserId IN (SELECT useridmine from friends where useridfrnd='" +uid+ "' and status='2' union SELECT useridfrnd from friends where useridmine='" +uid+ "' and status='2');";
					mysql.fetchData(function(err,resul){
						if(err){
							throw err;
						}
						else 
						{   
							if(resul.length > 0)
							{
								var farr = [];
								//q="SELECT firstname from users where UserId IN (Select useridfrnd from friends where useridmine='" + uid + "' and status ='2');";
								
								for(var i=0;i < resul.length ;i++){
									
									farr.push(resul[i].firstname);
								}

								var u="select grpname from grpmem where grpmemfirstname='" +req.fbsession.firstname+ "';";
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
										    	   grp.push(results[i].grpname);
										       }
												console.log(grp[0]);
												//res.send(JSON.stringify(grp));
												res.render('myprofile',{farr:farr,grp:grp});
												
										    }
											else{
												res.send("You have no groups");
												res.render('myprofile',{farr:farr,grp:[]});
											}
										}
									}, u);
									
								
								
								
							}
							else
								{
								console.log("no record found");
								var u="select grpname from grpmem where grpmemfirstname='" +req.fbsession.firstname+ "';";
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
										    	   grp.push(results[i].grpname);
										       }
												console.log(grp[0]);
												//res.send(JSON.stringify(grp));
												res.render('myprofile',{farr:[],grp:grp});
												
										    }
											else{
												res.send("You have no groups");
												res.render('myprofile',{farr:[],grp:[]});
											}
										}
									}, u);
								//res.render('myprofile',{farr:[],grp:grp});
								
								
								}
						}  
					}, query);
				}
				else
					{
					console.log("no record found");
					}
			}  
		}, u1);
	 
	  
};