const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        //A required string, uses regex to match the character length condition
        thoughtText:{
            type:String,
            required:true,
            match:[/^[\s\S]{1,280}$/,'Thoughts must be between 1 and 280 characters']
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
        username:{
            type: String,
            required:true,
        },
        reactions:[Reaction],
        
    },
    {
        toJSON: {
          virtuals: true,
        },
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


const Thought = model('thought',thoughtSchema)

module.exports = Thought;