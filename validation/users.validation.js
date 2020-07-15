module.exports.postCreate = function (req, res, next) {
    var errors = [];
  if(req.body.name.length >= 31) {
    errors.push('the Length of the name is greater 30 characters');
    res.render("create", {
      errors: errors
    });
    return;
  }
  next();
}