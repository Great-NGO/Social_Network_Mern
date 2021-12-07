const express = require('express');
const { signup, signin, signout } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const {userSignupValidator} = require('../validator');  // const validator = require('../validator/index') - WE DON'T INCLUDE THE NAME INDEX COS IT LOOKS FOR IT BY DEFAULT

const router = express.Router();


router.post("/signup", userSignupValidator ,signup );

router.post("/signin", signin );

router.get("/signout", signout );

// Any route containing :userId, our app will first execute userByID()
router.param("userId", userById)

module.exports = router;
