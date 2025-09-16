const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const Listing = require ("../models/listing");
const {isLoggedin , isOwner , validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage}); 

//Index and Create Route
router.route("/")
.get(wrapAsync (listingController.index))
.post( isLoggedin , validateListing , upload.single("listing[image]") , wrapAsync(listingController.createListing));

//New Route
router.get("/new" , isLoggedin , wrapAsync (listingController.renderNewForm));

//Show , Update and Delete Route
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put( isLoggedin , isOwner, upload.single("listing[image]") , validateListing , wrapAsync(listingController.updateListing))
.delete(isLoggedin, wrapAsync(listingController.destroyListing));

//Edit Route 
router.get("/:id/edit" , isLoggedin ,  isOwner , wrapAsync(listingController.renderEditForm));

module.exports = router;