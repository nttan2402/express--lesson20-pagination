var db = require("../db");

module.exports.requireAuth = function(req, res, next) {

	if(!req.signedCookies.userId) { //if cookie false --> back user to login page (not user)
		//with cookie, user can login users page.
		res.redirect("/login");
		return;
	}
	//if they have a cookie, check cookie in database (except for fake cookie)
	var user = db.get("users").find({ id: req.signedCookies.userId}).value();
	
	if(!user) { //if fake cookie redirect to login page
		res.redirect("/login");
		return;
	}
	//real cookie
  res.locals.user = user;

	next();//if real cookie next to user route
}