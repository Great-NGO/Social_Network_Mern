const Post = require("../models/post");
const formidable = require("formidable");
const fs = require("fs");
const _ = require('lodash');    //Lodash... to use the extend method to update post



exports.postById = (req, res, next, id) => {
    Post.findById(id)
        .populate("postedBy", "_id name")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(400).json({
                    error: err
                })
            }
            req.post = post
            next();
        })
}

exports.getPosts = (req, res) => {
    const posts = Post.find().populate("postedBy", "_id name").select("_id title body")
        .then((posts) => {
            res.json({ posts })
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.createPost = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        let post = new Post(fields);
        req.profile.hashed_password = undefined; // So it doesn't show hashed_password
        req.profile.salt = undefined; // So it doesn't show salt
        post.postedBy = req.profile
        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path) //Store image file using the readfile sync method
            post.photo.contentType = files.photo.type
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(result)
        })
    })

};

exports.postByUser = (req, res) => {
    Post.find({ postedBy: req.profile._id })
        .populate("postedBy", "_id name")
        .sort("_created")
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(posts)
        })
};

exports.isPoster = (req, res, next) => {
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id
    if (!isPoster) {
        return res.status(403).json({
            error: "User is not authorized"
        })
    }
    next();
};


exports.updatePost = (req, res, next) => {
    let post = req.post
    post = _.extend(post, req.body)
    post.updated = Date.now()
    post.save((err, updatedPost) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json(updatedPost);
    })
}

exports.deletePost = (req, res) => {
    let post = req.post
    post.remove((err, deletedPost) => {     //NB: Its the same as post.remove() .. i.e. the callback/error handling is not necessary
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        res.json({
            message: "Post deleted successfully"
        })
    })

}










// const getPosts = (req, res) => {
//     res.send("Post Api");
// }

// module.exports = {
//     getPosts
// }

