const _ = require('lodash');
const User = require("../models/user")

exports.userById = (req, res, next, id ) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user // adds profile object in req with user info
        next()
    })
}

exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id
    if(!authorized) {
        return res.status(403).json({
            error: "User is not authorized to perform this action"
        });
    }
};

exports.allUsers = (req, res, next) =>{
    User.find((err, users) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.json(users);
    }).select("name email updated created"); // Returns only name, email, updated and created properties for all users
};

exports.getUser = (req, res) => {
    req.profile.hashed_password = undefined; // So it doesn't show hashed_password
    req.profile.salt = undefined;   // So it doesn't show salt
    return res.json(req.profile);
};

exports.updateUser = (req, res, next) => {
    let user = req.profile
    user = _.extend(user, req.body) // Extend - mutate the source object
    user.updated = Date.now()
    user.save((err) => {
        if(err) {
            return res.status(400).json({
                error: "You are not authorized to perform this action"
            })
        }
        user.hashed_password = undefined; // So it doesn't show hashed_password
        user.salt = undefined;   // So it doesn't show salt
        res.json({user});
    })
};

exports.deleteUser = (req, res, next) => {
    let user = req.profile;
    user.remove((err, deletedUser) =>{
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
 
        res.json({message: "User account has been deleted successfully"});   
    })
}