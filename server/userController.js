const User = require('./userModel');


const userController = {

createUser(req, res) {
  User.create({ username: req.body.username, password: req.body.password }, (err, user) => {
    if (err){
      console.log(req.body);
      res.status(400).send('Error: problem connecting to database in User.create');
    }
    else {
      console.log(user);
      res.locals.user = user;
      return res.status(200).send(res.locals.user);
    }
  });
},

loginUser(req, res){

  User.findOne({ username: req.body.username, password: req.body.password }, (err, user) => {

   if (!user) {
     return res.status(400).send({err: 'Username & Password Do not match'})
   }

    if (err){
      res.status(400).send('Error: Problem connecting to database')
    }
    else {
      res.locals.user = user;
      return res.status(200).send(res.locals.user)
    }
  })
}

}


module.exports = userController;