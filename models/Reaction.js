const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId:{
            type: Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody:{
            type:String,
            required:true,

        },
        username:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }
);

module.exports = reactionSchema;