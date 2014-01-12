/*
 * displaySignUpForm ->
 *  displays sign up form for user to sign up for
 *  fly latex
 * @param req -> request object
 * @param res -> response object
 */
exports.displaySignUpForm = function(req, res) {
    res.render("sign-up",
               {title: "Sign Up for LaTeX Editor"
                , shortTitle: "Sign Up"
                , tagLine: "Start Editing Documents with Your Peeps!"
                , fileSpecificStyle: "sign-up.css"
                , fileSpecificScript: "application.js"
                , port : require("../configs").port
               });
};
