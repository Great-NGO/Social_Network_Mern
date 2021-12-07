const express = require('express');
const { userById, allUsers, getUser, updateUser, deleteUser } = require('../controllers/user');
const {requireSignin} = require('../controllers/auth');


const router = express.Router();
// Get all users
router.get("/users", allUsers );
// Get a single user
router.get("/user/:userId", requireSignin, getUser );
// Update a user
router.put("/user/:userId", requireSignin, updateUser );
// Delete user
router.delete("/user/:userId", requireSignin, deleteUser)


// Any route containing :userId, our app will first execute userByID()
router.param("userId", userById)

module.exports = router;
