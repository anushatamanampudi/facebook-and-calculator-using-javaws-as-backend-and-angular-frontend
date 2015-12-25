
/*
 * GET home page.
 */

exports.index = function(req, res){
  if(req.fbsession.email){
	  res.redirect('dashboard');
  }
  else{
  res.render('index', { title: 'Express' });
  }
};