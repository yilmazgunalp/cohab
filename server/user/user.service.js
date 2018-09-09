const User = require('./user');
const mongoose = require('mongoose');
mongoose.connect(config.db);


const createUser = User => userObject => {
  let {username,email,password} = userObject;
  let user = new User({username,email});
  user.setPassword(password);
  user.setActivationDigest();
  user.set({activationSentAt: Date.now()})
  return user.save();
}

const setPasswordDigest = User => async(userObject) => {
  let user = await User.findOne({email:userObject.email});
  if(user) {
  user.setResetPswdDigest();
  user.set({resetPswdSentAt: Date.now()})
  return user.save();
  } else { return null}
}

const resetPassword = User => async(userObject) => {
  //find the user with the id from the hidden field in the form
  let user = await User.findOne({_id: userObject.user_id});
  if(user) {
  user.setPassword(userObject.password);
  return user.save();
  } else { return null}
}

module.exports = User => {
  return {
    create: createUser(User),
    setPasswordDigest: setPasswordDigest(User),
    resetPassword: resetPassword(User)
  }
} 
  
  

