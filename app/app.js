const express = require('express');
const app = express();
const mongoose = require("mongoose");
const morgan = require('morgan');
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')
const expressValidator = require("express-validator");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


// NB: CORS USED FOR CROSS ORIGIN RESOURCE SHARING.. To share/allow access to our api from the frontend


//db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('DB Connected'))

mongoose.connection.on("error", (err) => {
    console.log(`DB Connection error: ${err.message}`);
});


// Bring in routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// apiDocs
app.get('/', (req, res) => {
    fs.readFile('docs/apiDocs.json', (err, data) => {
        if(err){
            res.status(400).json({
                error: err
            })
        }
        const docs = JSON.parse(data);
        res.json(docs)

    })
})

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);

// Middleware to handle unauthorized error for express-jwt
app.use(function(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
        res.status(401).json({ error: "Unauthorized!"});
    }
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Listening on Port", port);
})


// ATLAS PASSWORD: KVJjOdgQOy4oMjH8
