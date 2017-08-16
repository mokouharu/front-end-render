const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://localhost:3000/test');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("we're connected!");
});

module.exports = {
    "mongoose" : mongoose,
    "db" : db
};


