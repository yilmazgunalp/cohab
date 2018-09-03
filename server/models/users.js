const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const config = require('../config/config');

const UserSchema = new Schema({
    username: {type: String,unique: true},
    email: {type: String,unique: true},
    hash: String,
    salt: String,
    active: {type: Boolean,default: false},
    activationDigest: String,
    activationSentAt: Date,
    resetPswdDigest: String,
    resetPswdSentAt: Date
    });

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setActivationDigest = function() {
  this.activationDigest = crypto.randomBytes(256).toString('hex');
};

UserSchema.methods.setResetPswdDigest = function() {
  this.resetPswdDigest = crypto.randomBytes(256).toString('hex');
};

UserSchema.methods.getActivationLink = function() {
  return `${config.host}/user/activate?id=${this._id}&activationid=${this.activationDigest}`;
};

UserSchema.methods.getResetPswdLink = function() {
  return `${config.host}/user/resetform?id=${this._id}&resetid=${this.resetPswdDigest}`;
};

mongoose.connect(config.db);
const User = mongoose.model('user',UserSchema);

module.exports = User;
