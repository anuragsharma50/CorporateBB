import mongoose from "mongoose";
import { reviewSchema } from "./review.schema.js";
import { employeeSchema } from "../employee/employee.schema.js";

const ReviewModel = mongoose.model('review',reviewSchema);
const EmployeeModel = mongoose.model('employee',employeeSchema);

export default class ReviewRepository {

    async addReview({reviewMsg,reviewerId,employeeId}) {
        try {
            const review = new ReviewModel({msg:reviewMsg,reviewer:reviewerId,employee:employeeId});
            
            const employee = await EmployeeModel.findById(employeeId);
            employee.reviews.push(review._id);

            const reviewer = await EmployeeModel.findById(reviewerId);
            const reviewIndex = reviewer.pendingReviews.findIndex((i) => {
                let id = i.toString();
                return id === employeeId;
            });

            if(reviewIndex >= 0) {
                reviewer.pendingReviews.splice(reviewIndex, 1);
                await reviewer.save();
            }

            await review.save();
            await employee.save();

            return { success:true, res:review, employeeId  };
        } catch (err) {
            return {success:false,error:{statusCode:400,msg:err}}
        }
    }

    async updateReview({reviewId,reviewMsg}) {
        try {
            const review = await ReviewModel.findByIdAndUpdate(reviewId,{msg:reviewMsg},{returnDocument:'after'});
            return { success:true, res:review };
        } catch (err) {
            return {success:false,error:{statusCode:400,msg:err}}
        }
    }

    async getReviewsforEmployee(employeeId) {
        try {
            const employee = await EmployeeModel.findById(employeeId);
            if(!employee) {
                return {success:false,error:{statusCode:404,msg:"Employee not found"}}
            }

            const reviews = await ReviewModel.find({employee:employeeId}).populate("reviewer");
            return { success:true, reviews, employee };
        } catch (err) {
            console.log("error");
            return {success:false,error:{statusCode:400,msg:err}}
        }
    }

    async getReview(reviewId) {
        try {
            const review = await ReviewModel.findOneById(reviewId);
            return { success:true, res:review };
        } catch (err) {
            return {success:false,error:{statusCode:400,msg:err}}
        }
    }

}