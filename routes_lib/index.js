// load configs from configs JSON here
var configs = require("../configs");

/*
 * index
 * handles both get and post request on the / page
 * @param req -> request object
 * @param res -> response object
 * @param err -> error object
 *
 */
exports.index = function(req, res, err){    
    req.session.currentUser = (req.session.currentUser == undefined ?  "" :
                               req.session.currentUser);
    
    req.session.isLoggedIn = (req.session.isLoggedIn == undefined ? false :
                              req.session.isLoggedIn);
    
    req.session.userDocuments = (req.session.userDocuments == undefined ? [] :
                                 req.session.userDocuments);
    
    if (req.session.currentUser && req.session.isLoggedIn) {
        // display the documents for user
        res.render("display-docs",
                   {title: "LaTeX Editor: Start Editing Documents"
                    , shortTitle: "LaTeX Editor"
                    , tagLine: "Start Editing Documents with Your Peeps!"
                    , fileSpecificScript: "application.js"
                    , currentUser: req.session.currentUser
                    , isLoggedIn: req.session.isLoggedIn
                    , userDocuments: req.session.userDocuments          
                    , port : configs.port
                   });
        
    } else {
        // user didn't try to log in 
        res.render("not-logged-in",
                   {title: "Log Into/Sign Into to LaTeX Editor!"
                    , shortTitle: "LaTeX Editor"
                    , tagLine: "Collaborative editor in node-js"
                    , fileSpecificStyle: "not-logged-in.css"
                    , port : configs.port});
    }
};
