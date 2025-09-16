if((process.env.NODE_ENV)!="production"){
    require('dotenv').config();
}

const express = require ("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require ("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const expressError = require("./utils/expressError.js");
const {listingSchema , reviewSchema} = require("./schema.js");
const Review = require ("./models/review");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

//DB_URL
const dbUrl = process.env.ATLASDB_URL;

// requiring routes 
const listingRoutes = require("./routes/listing.js");
const reviewRoutes = require("./routes/review.js");
const userRoutes = require("./routes/user.js");


//Mongo session store 
const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto : {
        secret : process.env.SECRET,
    },
    touchAfter : 24*3600,
});

store.on("error" , () => {
    console.log("ERROR IN MONGO SESSION STORE", error);
});

const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie: {
    httpOnly: true,
    expires: Date.now() +7*24*60*60*1000,
    maxAge : 7*24*60*60*1000,
        }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());

app.use((req , res , next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname , "/public")));

main().then(()=>{
    console.log("Connected!");
}).catch((err)=>{
    console.log("Error Found!" , err);
});

async function main(){
    await mongoose.connect(dbUrl);
};

let port =  8080;
app.listen(port , ()=>{
    console.log(`app is listening on ${port}`);
});

//Using routes
app.use("/listings" , listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/" , userRoutes);

// Err Handling Middleware 
app.use((req,res,next)=>{
    next(new expressError(404 , "page not found!"));
});

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;

    let messages;
    if (err.details) {
        // Joi validation errors -> array of messages
        messages = err.details.map(el => el.message);
    } else {
        // Single error -> wrap in array or pass string
        messages = Array.isArray(err.message) ? err.message : [err.message];
    }

    res.status(statusCode).render("listings/error.ejs", { err: { message: messages, statusCode } });
});


//for fixing map errors
app.use((req, res, next) => {
    res.locals.MAP_TOKEN = process.env.MAP_TOKEN;
    next();
});

