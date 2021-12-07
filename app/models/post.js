const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        data: Buffer,   // We'll be storing the photo in a binary format in the database
        contentType: String
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Post", postSchema);








// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: "Title is required",
//         minlength: 4,
//         maxlength: 150 

//     },
//     body: {
//         type: String,
//         require: "Body is required",
//         minlength: 4,
//         maxlength: 2000
//     }
// });

// module.exports = mongoose.model("Post", postSchema);


