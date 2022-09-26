const mongoose = require('mongoose');


  
const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email'],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought"
    }],
    friends:[{
        type: Schema.Types.ObjectId,
        ref: this.ObjectId
    }]
});

const User = mongoose.model('User', userSchema);

module.exports=User