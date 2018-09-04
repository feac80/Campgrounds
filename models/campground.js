const mongoose = require("mongoose");

var campgroundSchema = mongoose.Schema({
    name:String,
    image:String,
    descriptions:String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username:String
        
        
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
        
        ]
    
});//creating the schema

module.exports = mongoose.model("Campground", campgroundSchema );