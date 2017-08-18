/**
 * Created by zhj on 17/8/16.
 */

const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://localhost:30000/test');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("连接成功");
});


module.exports = {
    "mongoose" : mongoose,
    "db" : db
};


