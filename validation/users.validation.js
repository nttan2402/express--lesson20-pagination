module.exports.postCreate = function (req, res, next) {
    var errors = [];
  
  if(!req.body.name) {
    errors.push('Name is required')
  }

  if(!req.body.age) {
    errors.push('Age is required')
  }
  if(errors.length) {
    res.render("create", {
      errors: errors,
      values: req.body
    })
    return;
  }
  if(req.body.name.length >= 31) {
    errors.push('the Length of the name is greater 30 characters');
    res.render("create", {
      errors: errors
    });
    return;
  }
  next();
}
//