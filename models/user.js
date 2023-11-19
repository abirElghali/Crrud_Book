var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    username: {type: String, required: true,unique: true},
    password: {type: String, required: true},
    name: {type:String}
    
})

userSchema.methods.toPublic = function () {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
  };




module.exports = mongoose.model("User", userSchema);
