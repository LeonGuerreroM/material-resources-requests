const boom = require('@hapi/boom');

function checkRoles(...categories){
  return (req, res, next) => {
    //console.log(categories);
    const user = req.user;
    //console.log(user.role);
    if(categories.includes(user.role)){
      next();
    }else{
      next(boom.unauthorized());
    }
  }
}

module.exports = checkRoles;
