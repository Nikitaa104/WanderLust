const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const Review = require ("./review.js");

const listingSchema = new Schema ({
    title : {
        type : String,
        required : true,
    },
    description : String,
    image: {
        url : String,
        filename : String,
},
    price : Number,
    location : String,
    country : String,
    
//review (one to may relation {Approach 2})
reviews : [
    {
        type : Schema.Types.ObjectId,
        ref : "Review",
    }
],
owner : {
    type : Schema.Types.ObjectId,
    ref : "User",
    
},
geometry : { 
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
},
category : {
    type : String,
    enum : ["Trending", "Iconic cities", "Mounting", "Arctic", "Farm", "Cabin", "Room","Castle" , "Others"] ,
},
} );
//Post middleware for deleting reviews 
listingSchema.post("findOneAndDelete" , async(listing) => {
    if(listing){
        await Review.deleteMany({ _id : {$in : listing.reviews }});
    }
});
const Listing = mongoose.model ("Listing" , listingSchema);
module.exports = Listing;