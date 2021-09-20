const express = require('express');
const userRouter = express.Router()
const User = require("./../Models/user")


// Get All
userRouter.get("/", (req, res, next) => {
 console.log(User)
  User.find((err, users) => {

    console.log(User)
    if(err){
      console.log(err)
      res.status(500)
      return next(err)
    } else
    {return res.status(200).send(users)}
  })
 });


// Post One
userRouter.post("/", (req, res, next) => {
  const newUser = new User(req.body)
  newUser.save((err, savedUser) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedUser)
  })
  
//   return res.status(201).send(newUser)
})


// Get One
userRouter.get("/:userId", (req, res, next) => {
  console.log("inside get by id");
 
  const userId = req.params.userId;
  
    User.findOne({_id: userId}, function(err, foundUser) {
    if (err) {
      console.log(err);
      res.status(500)
      return next(err)
    } 

  console.log(userId)
  if(!foundUser){
    const error = new Error(`The item with id ${userId} was not found.`)
    res.status(404)
    return next(error)
  }
  console.log(foundUser);
  return res.status(200).send(foundUser);
}) });


// Get by username
userRouter.get("/search/username", (req, res, next) => {
  const username = req.query.username
  User.find({ username: username}, (err, user) => {
    if(!user){
        const error = new Error("You must provide a user name")
        res.status(500)
        return next(error)
      }
      return res.status(200).send(user)
  }
 
)})


// Delete One
userRouter.delete("/:userId", (req, res, next) => {
  User.findOneAndDelete(
    {_id: req.params.userId}, 
    (err, deletedItem) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted item ${deletedItem.username} from the database`)
    }
  )
})


// Update One
userRouter.put("/:userId", (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.params.userId},
    req.body,
    {new: true},
    (err, updatedUser) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedUser)
    }
  )  
})


module.exports = userRouter