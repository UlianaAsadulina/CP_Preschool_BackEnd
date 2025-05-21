import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email required"],
    },
    password: {
        type: String,
        required: [true, "Password required"] },
    FirstName: {
        type: String,
        required: [true, "First name required"]
    },
    LastName: {
        type: String,
        required: [true, "Last name required"]
    },
    userDOB: {
        type: Date,
        required: false },
    role: {
        type: String,
        enum: [ "user", "admin", "parent" ],
        default: "user",
        required: [ true, "Role required"],
    },      
    phone: {
        type: Number,
        required: false, 
        min: 1000000000,
        max: 9999999999
    },
    
});

const User = mongoose.model('User', userSchemaSchema);

export default User;