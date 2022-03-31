const boom = require('@hapi/boom');

function checkRoles(...categories){
  return (req, res, next) => {
    const user = req.user;
    if(categories.includes(user.role)){
      next();
    }else{
      next(boom.unauthorized());
    }
  }
}

module.exports = checkRoles;
