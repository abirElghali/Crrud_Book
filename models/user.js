var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: true,unique: true},
    password: {type: String, required: true},
    name: {type:String}
    
});

userSchema.plugin(uniqueValidator);


userSchema.methods.toPublic = function () {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
  };

module.exports = mongoose.model("User", userSchema);
