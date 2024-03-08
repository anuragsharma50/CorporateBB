import ReviewRepository from "./review.repository.js";

export default class ReviewController {

  constructor() {
    this.reviewRepository = new ReviewRepository();  
  }

  async addReview(req,res,next) {
    const {reviewMsg,employeeId} = req.body;
    const reviewerId = req.userId;
    const resp = await this.reviewRepository.addReview({reviewMsg,reviewerId,employeeId});
    if(resp.success) {
      if(req.admin) {
        res.redirect(`/reviews/employee?employeeId=${resp.employeeId}`);
      }
      else{
        res.redirect('/employee/pending-reviews');
      }
    }
    else{
      console.log(resp.error.msg);
    }
  }

  async updateReview(req,res,next) {
    const {reviewId,reviewMsg} = req.body;
    console.log({reviewId,reviewMsg});
    const resp = await this.reviewRepository.updateReview({reviewId,reviewMsg});
    if(resp.success) {
      res.redirect(`/reviews/employee?employeeId=${resp.res.employee}`);
    }
    else{
      console.log(resp.error.msg);
    }
  }

  async getReviewsforEmployee(req,res,next) {
    const {employeeId} = req.query;
    const resp = await this.reviewRepository.getReviewsforEmployee(employeeId);
    if(resp.success) {
      // console.log(resp);
      return res.render("viewReviews",{reviews:resp.reviews,employee:resp.employee});
    }
    else{
      console.log(resp.error);
    }
  }

  async getReview(req,res,next) {
    const {reviewId} = req.query;
    const resp = await this.reviewRepository.getReview(reviewId);
    if(resp.success) {
      
    }
    else{
      console.log(resp.error.msg);
    }
  }
  
}

