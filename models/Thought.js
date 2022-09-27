const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText:{
            type:String,
            required:true,
            match:[/^{1,280}$/,'Thoughts must be between 1 and 280 characters']
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
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


const Thought = model('user',thoughtSchema)

module.exports = Thought;