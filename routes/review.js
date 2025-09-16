const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const {reviewSchema} = require("../schema.js");
const Listing = require ("../models/listing");
const Review = require ("../models/review");
const {isLoggedin , isReviewAuthor} = require("../middleware");
const reviewController = require("../controllers/reviews.js");

//Joi validate review 
const validateReview = (req , res, next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        throw new expressError(400 , error);
    } else {
        return next();
    }
};

//Reviews 
//Post review Route
router.post("/" , isLoggedin , validateReview, wrapAsync(reviewController.createReview));
//Delete review route 
router.delete("/:reviewId" , isLoggedin , isReviewAuthor , wrapAsync(reviewController.destroyReview));

module.exports = router;