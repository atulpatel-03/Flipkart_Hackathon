const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    from:{
        type : String,
        required:true,
    },
    to:{
        type: String,
        required: true,
    },
    CC:{
        type:String
    },
    subject:{
        type:String
    },
    schedule:{
        type:String
    },
    text:{
        type:String
    },
    date:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Post',PostSchema);