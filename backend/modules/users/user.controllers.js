import User from './user.model';
import { getToken } from '../../utils/ultil';

exports.getUser = async (req , res )=> {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
      });
      
      if (signinUser) {
        res.send({
          _id: signinUser.id,
          name: signinUser.name,
          email: signinUser.email,
          isAdmin: signinUser.isAdmin,
          token: getToken(signinUser),
        });
      } else {
        res.status(401).send({ message: 'Invalid Email or Password.' });
      }
    
};
exports.userRegister = async (req , res )=> {
  const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
  const newUser = await user.save();  
    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      });
    } else {
      res.status(401).send({ message: 'Invalid user data.' });
    }
};


exports.getAdmin = async( req, res) =>{
    try {
        const user = new User({
            name : 'liem',
            email : 'liemdonduong@gmail.com',
            password: 'liem123',
            isAdmin : true

        });
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({msg: error.message});
    }
};
exports.demo = async( req, res) =>{
    res.send("hello");
};