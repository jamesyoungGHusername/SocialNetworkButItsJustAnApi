const { Thought, User } = require('../models');


module.exports = {
    getThoughts(req,res){
        Thought.find().then((thoughts) => res.json(thoughts));
    },
    //by _id
    getOneThought(req,res){
        Thought.findById(req.params.thoughtId,function(err,thought){
            if(err){
                res.status(500).json(err);
                return;
            }
            !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        })
    },
    //create thought and add to user list of thoughts.
    createThought(req,res){
        Thought.create(req.body)
        .then((thought) => {
            console.log(thought);
            
            return User.findOneAndUpdate(
              { username: req.body.username },
              { $addToSet: { thoughts: thought._id } },
              { new: true }
            );
          }).then((user) =>{
          !user
            ? res.status(404).json({
                message: 'Thought created, but found no user with that ID',
              })
            : res.json('Created the thought 🎉')
            })
        .catch((err)=> res.status(500).json(err));
    },
    //by _id
    updateThought(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((thought)=>
            !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        ).catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    deleteThought(req,res){
        Thought.findOneAndRemove({_id: req.params.thoughtId})
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thought: req.params.thoughtId } },
              { new: true }
            )
        ).then((user)=>
        !user
        ? res
            .status(404)
            .json({ message: 'Thought exists but no user with this id!' })
        : res.json({ message: 'Thought successfully deleted!' })
        ).catch((err)=>res.status(500).json(err));
    },
    //(/api/thoughts/:thoughtId/reactions)
    addReaction(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { responses: req.body } },
            { runValidators: true, new: true }
        ).then((thought)=>
            !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        ).catch((err) => res.status(500).json(err));
    },
    deleteReaction(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        ).then((thought)=>
            !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        ).catch((err) => res.status(500).json(err));
    }
};