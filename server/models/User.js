import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},

}, {timestamps: true})


// uses middleware to hash password before saving in db
UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})


// method to compare password whether it matches the hashed password in db when logging in
UserSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
} 

export default mongoose.model('User', UserSchema);