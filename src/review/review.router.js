import express from "express";
import ReviewController from "./review.controller.js";
import { adminAuth, auth } from "../../middlewares/auth.js";

const ReviewRouter = express.Router();

const reviewController = new ReviewController();

ReviewRouter.post('/add',(req,res,next) => {
    reviewController.addReview(req,res,next);
}) 

ReviewRouter.post('/update', adminAuth, (req,res,next) => {
    reviewController.updateReview(req,res,next);
})

ReviewRouter.get('/employee', adminAuth, (req,res,next) => {
    reviewController.getReviewsforEmployee(req,res,next);
})

ReviewRouter.get('/', (req,res,next) => {
    reviewController.getReview(req,res,next);
})


export default ReviewRouter;
