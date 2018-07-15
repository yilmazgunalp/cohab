const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: String,
    hash: String,
    salt: String,
    active: Boolean,
    activation_digest: String,
    activated_at: Date
    });

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

mongoose.connect('mongodb://mongo/userdb');
const User = mongoose.model('user',UserSchema);

module.exports = User;
