
const mongoose = require("mongoose");
const Review = require("./models/review"); // path to Review model
const User = require("./models/user");     // path to User model

async function fixReviews() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderLust"); // your DB name

    const defaultUser = await User.findOne();
    if (!defaultUser) {
      console.log("No users found in DB! Cannot assign author.");
      return;
    }

    const reviews = await Review.find({ author: { $exists: false } });

    console.log(`Found ${reviews.length} reviews without authors.`);

    for (let review of reviews) {
      review.author = defaultUser._id;
      await review.save();
      console.log(`Updated review ${review._id}`);
    }

    console.log("Fixed missing authors!");
    await mongoose.disconnect();
  } catch (e) {
    console.error(e);
  }
}

fixReviews();

