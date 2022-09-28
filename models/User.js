const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
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
            ref: "thought"
        }],
        friends:[{
            type: Schema.Types.ObjectId,
            ref: this.ObjectId
        }]
    },
    {
        toJSON: {
        virtuals: true,
        }
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports=User;