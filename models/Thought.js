const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText:{
        type:String,
        required:true,
    },
    createdAt:{
        type: Date,
        default: Date.now,

    },
    username:{
        type: String,
        required:true,
    },
    reactions:
        [Reaction]
    
    
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


const Thought = model('user',thoughtSchema)

module.exports = Thought;