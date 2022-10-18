const express = require("express");
const router = express.Router();
const config = require("../config/config");
const util = require('util')
const colors = require('colors')
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const auth = require('../middleware/auth')
var qs = require("querystring");
var http = require("http");

let a = "b97dffdf-a78e-4d96-8f5f-caffc7120b6d/643295"

// let { parseError, sessionizeUser } =   require('../util/helpers')
const {
    v4: uuidv4
} = require('uuid');



router.post("/login", async (req, resp) => {

    let {
        phoneNumber,
        email
    } = req.body.userDetails;


    var options = {
        "method": "GET",
        "hostname": "2factor.in",
        "port": null,
        "path": "/API/V1/230f59ed-0b38-11e8-a895-0200cd936042/SMS/" + `${phoneNumber}` + "/AUTOGEN/SMFEMALOGIN",
        "headers": {
            "content-type": "application/x-www-form-urlencoded"
        }
    };

    userModel.findOne({
            phoneNumber
        })
        .then(user => {
            if (user) {

                let sessionId;
                var req = http.request(options, function (res) {
                    var chunks = [];

                    res.on("data", function (chunk) {
                        chunks.push(chunk);
                    });

                    res.on("end", function () {
                        var body = Buffer.concat(chunks);
                        //   console.log(body.toString());
                        parsedBody = JSON.parse(body)
                        if (parsedBody && typeof (parsedBody.Details) != undefined && typeof (parsedBody.Details) != null) {

                            sessionId = parsedBody.Details
                            user.sessionId = sessionId

                        }

                        let {
                            userId,
                            firstName,
                            lastName,
                            phoneNumber,
                            emailNumber,
                            userRole
                        } = user

                        resp.status(200).type('json').send(JSON.stringify({
                            userResponse: {
                                sessionId,
                                userId,
                                firstName,
                                lastName,
                                phoneNumber,
                                emailNumber,
                                userRole
                            }

                            // 
                            // message: "Successfully added User"
                        }, null, 2));

                    });
                });
                req.write(qs.stringify({}));
                req.end();
            }
        })

        .catch(error => {
            util.log(colors.red(error))
        })


})

router.post("/", async (req, resp) => {
    // try {
    let {
        firstName,
        lastName,
        email,
        phoneNumber,
        companyName,
        userRole,
    } = req.body.userDetails;

    var options = {
        "method": "GET",
        "hostname": "2factor.in",
        "port": null,
        "path": "/API/V1/230f59ed-0b38-11e8-a895-0200cd936042/SMS/" + `${phoneNumber}` + "/AUTOGEN/SMLOGIN",
        "headers": {
            "content-type": "application/x-www-form-urlencoded"
        }
    };


    userModel.findOne({
            phoneNumber
        })
        .then(user => {
            if (user) {
                return resp.status(400).json({
                    message: "User Already Exists"
                });
            }

            const newUser = new userModel({
                firstName,
                lastName,
                email,
                phoneNumber,
                companyName,
                userRole,
                // uuidv4
            });
            //   await newUser
            newUser.save()
                .then(user => {
                    // req.session.user = {
                    //     username: user.firstName,
                    //     _id: user.userId
                    // }
                    let sessionId;
                    var req = http.request(options, function (res) {
                        var chunks = [];

                        res.on("data", function (chunk) {
                            chunks.push(chunk);
                        });

                        res.on("end", function () {
                            var body = Buffer.concat(chunks);
                            //   console.log(body.toString());
                            parsedBody = JSON.parse(body)
                            if (parsedBody && typeof (parsedBody.Details) != undefined && typeof (parsedBody.Details) != null) {

                                sessionId = parsedBody.Details
                                user.sessionId = sessionId

                            }

                            let {
                                userid,
                                firstName,
                                lastName,
                                phoneNumber,
                                emailNumber,
                                userRole,
                                userId
                            } = user

                            resp.status(200).type('json').send(JSON.stringify({
                                userResponse: {
                                    sessionId,
                                    userid,
                                    firstName,
                                    lastName,
                                    phoneNumber,
                                    emailNumber,
                                    userRole,
                                    userId
                                }

                                // 
                                // message: "Successfully added User"
                            }, null, 2));

                        });
                    });
                    req.write(qs.stringify({}));
                    req.end();
                })
            //   jwt.sign({
            //       id: user.id
            //     },
            //     config.jwtSecret, {
            //       expiresIn: 1036800
            //     },
            //     (error, token) => {
            //       if (error) throw error;

            //  
            //     }
            //   );
            // })
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});


// router.post("/verifyuserotp/", (req, resp) => {

//     let {
//         otp,
//         sessionid

//     } = req.params

//     // console.log(otp,sessionid)
//     var options = {
//         "method": "GET",
//         "hostname": "2factor.in",
//         "port": null,
//         // "path": "/API/V1/230f59ed-0b38-11e8-a895-0200cd936042/SMS/VERIFY/" + `${sessionid}` + "/"
//         // `${otp}`,
//         "path" : "/API/V1/230f59ed-0b38-11e8-a895-0200cd936042/SMS/VERIFY/b97dffdf-a78e-4d96-8f5f-caffc7120b6d/643295",
//         "headers": {
//             "content-type": "application/x-www-form-urlencoded"
//         }
//     };


//     console.log(options.path)

//     // var request = require("request");


//     // request(options, function (error, response, body) {
//     //     if (error) throw new Error(error);

//     //     console.log(body);
//     // });
//     var req = http.request(options, function (res) {
//         var chunks = [];

//         res.on("data", function (chunk) {
//             chunks.push(chunk);
//             // console.log(chunks)
//         });

//         res.on("end", function () {
//             var body = Buffer.concat(chunks);
//             console.log(body);
//             // parsedBody = JSON.parse(body)
//             // if (parsedBody && typeof (parsedBody.Details) != undefined && typeof (parsedBody.Details) != null) {

//             //     sessionId = parsedBody.Details
//             //     user.sessionId = sessionId

//             // }
//             // resp.status(200).type('json').send(JSON.stringify({

//             //     // 
//             //     // message: "Successfully added User"
//             // }, null, 2));

//         });
//     });

//     req.write(qs.stringify({}));
//     // req.end();
// })



router.put("/", (req, res) => {
    let {
        firstName,
        lastName,
        email,
        phoneNumber,
        companyName,
        userRole,
    } = req.body.userDetails;


    userModel.findOneAndUpdate({
            phoneNumber
        }, {
            $set: req.body.userDetails
        })
        .then(user => {
            res.status(200).type('json').send(JSON.stringify({
                message: "Successfully Updated User"
            }, null, 2));
        })
        .catch(error => {
            util.log(colors.red(error))
        })
});

// router.post('/register', userController.register)
// router.post('/login', userController.login)
// router.post('/logout', userController.logout)

// // Profile ralted route
// // router.get('/profile/:username', userController.ifUserExists, userController.profilePostsScreen)

// // post related routes
// router.get('/create-post', userController.mustLog, postController.viewCreateScreen)
// router.post('/create-post', userController.mustLog, postController.create )
// router.get('/post/:id', postController.viewSingle)

mustLog = function (req, res, next) {
    if (req.session.user) {
        next()
    } else {
        req.flash("err", "you must be log in")
        req.session.save(() => {
            res.redirect('/')
        })
    }
}

login = function (req, res) {
    let user = new User(req.body)
    user.login.then((result) => {
        req.session.user = {
            avatar: user.avatar,
            Username: user.data.username,
            _id: user.data._id
        }
        req.session.save(() => {
            res.redirect('/')
        })
    }).catch((e) => {
        req.flash('err', e)
        req.session.save(() => {
            res.redirect('/')
        })
    })
}

logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })

}

router.post("/register", function (req, res) {
    let {
        firstName,
        lastName,
        email,
        phoneNumber,
        companyName,
        userRole,
    } = req.body.userDetails;
    userModel.findOne({
        phoneNumber
    })

    let adduser = new userModel({
        firstName,
        lastName,
        email,
        phoneNumber,
        companyName,
        userRole,
    })
    adduser
        .save()
        .then((user) => {
            console.log(user)

            req.session.user = {
                username: user.data.firstName,
                _id: user.userId
            }
            // req.session.save(() => {
            //     res.redirect('/')
            // })
            res.status(200).type('json').send(JSON.stringify({
                message: user
            }, null, 2));
        }).catch((regErr) => {
            res.status(200).type('json').send(JSON.stringify({
                message: regErr
            }, null, 2));
            // req.session.save(() => {
            //     res.redirect('/')
            // })
        })

})
// home = (req, res) => {
//     if (req.session.user) {
//         res.render('home-dashboard')
//     } else {
//         res.render('home-guest', {err: req.flash('err'), regErr: req.flash('regErr')})
//     }
// }

ifUserExists = function (req, res, next) {
    User.findByUsername(req.params.username).then(function (userDocument) {
        req.profileUser = userDocument
        next()
    }).catch(function () {
        res.render("404")
    })
}

profilePostsScreen = function (req, res) {
    res.render('profile', {
        profileUsername: req.profileUser.username,
        profileAvatar: req.profileUser.avatar
    })
}

module.exports = router;