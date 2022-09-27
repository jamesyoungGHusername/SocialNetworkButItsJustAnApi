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
            match:[/^{1,280}$/,'reactions must be fewer than 280 characters']
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