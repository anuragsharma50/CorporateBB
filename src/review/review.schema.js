import mongoose from "mongoose";

export const reviewSchema = mongoose.Schema({
    msg: {
        type: String,
        required: [true,'Please enter a message']
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee',
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee',
    }
})

