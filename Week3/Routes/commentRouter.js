const express = require('express');
const commentRouter = express.Router()
const Comment = require("./../Models/user")


// Get All
commentRouter.get("/", (req, res, next) => {
 console.log(Comment)
  Comment.find((err, comments) => {

    console.log(Comment)
    if(err){
      console.log(err)
      res.status(500)
      return next(err)
    } else
    {return res.status(200).send(comments)}
  })
 });


// Post One
commentRouter.post("/", (req, res, next) => {
     req.body.username = req.user.username
  req.body.issueId = req.params.issueId
  const newComment = new Comment(req.body)
  newComment.save((err, savedComment) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedComment)
  })
  
})


// Get One
commentRouter.get("byId/:commentId", (req, res, next) => {
  console.log("inside get by id");
 
  const commentId = req.params.commentId;
  
    Comment.findOne({_id: commentId}, function(err, foundComment) {
    if (err) {
      console.log(err);
      res.status(500)
      return next(err)
    } 

  console.log(userId)
  if(!foundComment){
    const error = new Error(`The item with id ${commentId} was not found.`)
    res.status(404)
    return next(error)
  }
  console.log(foundComment);
  return res.status(200).send(foundComment);
}) });


// Get by username
commentRouter.get("/search/username", (req, res, next) => {
  const username = req.query.username
  Comment.find({ username: username}, (err, comment) => {
    if(!comment){
        const error = new Error("You must provide a user name")
        res.status(500)
        return next(error)
      }
      return res.status(200).send(comment)
  }
 
)})


commentRouter.get('/search', (req, res, next) => {
    const { body} = req.query
    console.log(body)

    const pattern = new RegExp(body)
    console.log(pattern)
    Comment.find (
      { username: { $regex: pattern, $options: 'i' } }, 
      (err, bodies) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(bodies)
      }
    )
  })


// Delete One
commentRouter.delete("/:userId", (req, res, next) => {
  Comment.findOneAndDelete(
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
commentRouter.put("/:userId", (req, res, next) => {
  Comment.findOneAndUpdate(
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


module.exports = commentRouter