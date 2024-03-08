import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

export const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please provide your Name"]
    },
    email: {
        type: String,
        required: [true,"Please provide your Email"],
        unique: true,
        validate: [validator.isEmail,"Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true,"Please provide a password"],
        select: false
    },
    assignedEmployeeId: {
        type: Number,
        required: [true,"Please provide employee id"],
    },
    pendingReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review'
    }],
    admin: {
        type: Boolean,
        default: false
    }
})

// hash user password before saving
employeeSchema.pre("save", async function (next) {
    if(this.password) {
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
})

employeeSchema.post("save", function(err,doc,next) {
    if(err.name == "MongoServerError" && err.code == 11000) {
        next(new Error("Email already registered"));
    }
    else{
        next(err);
    }
})

// compare password
employeeSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);
}

