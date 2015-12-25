/**
 * New node file
 */
var mysql = require('./mysql');
exports.about = function(req, res){
	
	
	query = "Select * from aboutme where userfname='" +req.fbsession.firstname+ "';";
	
	mysql.fetchData(function(err,re){
		if(err){
			console.log("i am in about error")
			throw err;
		}
		else 
		{    var flist=[];
			
		    if(re.length >0){
		    	
			/*for(var i=0;i < re.length ;i++){
				
				flist.push(re);
			}*/
			console.log(re[0]);
			res.render('about',{re:re});
			
		  }
		    else{
		    	console.log("no firstname of user found");
		    	res.render('about');
		    }
		}  
	}, query);
	

	
	
	
	
	
	
};
