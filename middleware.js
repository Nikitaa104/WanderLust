const Listing = require("./models/listing");
const Review = require("./models/review");
const {listingSchema , reviewSchema} = require("./schema.js");
const expressError = require("./utils/expressError.js");

// joi Validation Middleware:
module.exports.validateListing = (req , res, next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        throw new expressError(400 , error);
    } else {
        return next();
    }
};
module.exports.isLoggedin = (req , res , next) => {
        if (!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "user must be logged in");
        return res.redirect("/login");
    };
    next();
};

module.exports.redirectUrl = (req,res,next) =>{
            if(req.session.redirectUrl){
                res.locals.redirectUrl = req.session.redirectUrl;
                //delete req.session.redirectUrl;
            };
            next();
}

module.exports.isOwner = async(req , res , next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if (!res.locals.currUser || !listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You don’t have permission to edit this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.isReviewAuthor = async(req , res , next) =>{
    let { id , reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You don’t have permission to edit other's review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
