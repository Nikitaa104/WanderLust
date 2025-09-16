const User = require("../models/user");


module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.renderLoginForm = (req , res)=>{
    res.render("users/login.ejs");
};

module.exports.signup = (async(req , res)=>{
    try { 
    let {username , email , password} = req.body;
    const newUser = new User ({email , username});
    let registeredUser = await User.register(newUser , password);
    console.log(registeredUser);
    req.login(registeredUser , function(err) {
        if(err){
            return next(err);
        }
    req.flash("success" , "Registered Successfully!");
    res.redirect("/listings");
    });
    } catch (err) {
        req.flash("error" , err.message);
        res.redirect("/listings");
    }
});

module.exports.login = (req , res)=>{
    req.flash("success" , "Welcome to WanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {  
        if (err) {
            return next(err);
        }
        req.flash("success", "You have logged out!");
        res.redirect("/listings");
    });
};