import { Router } from 'express';

const users:Router = Router();

/* GET users listing. */
users.get('/', function(req, res, next) {
  let me: String = "shy";
  res.send({message: `respond with a ${me} resource`});
});

export default users;