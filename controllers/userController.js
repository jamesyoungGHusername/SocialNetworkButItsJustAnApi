const { User } = require('../models');

module.exports = {
    getUsers(req,res){
        User.find()
        .then((users) => res.json(users));
    },
    //by _id
    getSingleUser(req,res){
        User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    },
    createUser(req,res){
        User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
    },
    //by _id
    updateUser(req,res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((user)=>
            !user
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(user)
        ).catch((err)=>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    //by _id, remove associated thoughts as well.
    deleteUser(req,res){
        User.findOneAndRemove({ _id: req.params.userId })
        .then((user)=>
            !user
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(user)
        ).catch((err)=>{
            res.status(500).json(err)
        });
    },

    //(/api/users/:userId/friends/:friendId)
    addFriend(req,res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
          ).then((user)=>
            !user
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(user)
          ).catch((err)=>{
            res.status(500).json(err)
            });
    },
    removeFriend(req,res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { _id: req.params.friendId } } },
            { runValidators: true, new: true }
          ).then((user)=>
            !user
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json(user)
          ).catch((err)=>{
            res.status(500).json(err)
            });
    }

};