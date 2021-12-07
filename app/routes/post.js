const express = require('express');
const {getPosts, createPost, postByUser, postById, isPoster, deletePost, updatePost} = require('../controllers/post');
const {requireSignin} = require('../controllers/auth');
const { userById } = require('../controllers/user');
const {createPostValidator} = require('../validator');  // const validator = require('../validator/index') - WE DON'T INCLUDE THE NAME INDEX COS IT LOOKS FOR IT BY DEFAULT

const router = express.Router();

router.get("/posts", getPosts);
router.post("/post/new/:userId", requireSignin, createPost, createPostValidator );

router.get("/posts/by/:userId", postByUser);
// Update Posts
router.put("/post/:postId", requireSignin, isPoster, updatePost);
// Delete posts
router.delete("/post/:postId", requireSignin, isPoster, deletePost);

// Any route containing :userId, our app will first execute userByID()
router.param("userId", userById)

// Any route containing :postId, our app will first execute postByID()
router.param("postId", postById)


module.exports = router;
