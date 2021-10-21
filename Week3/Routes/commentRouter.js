const express = require('express');
const commentRouter = express.Router()
const Comment = require("./../Models/comment")


// Get All
commentRouter.get("/", (req, res, next) => {
 console.log(Comment)
  Comment.find((err, comments) => {
    console.log(Comment)
    //if the user is not authenticated, dont return the comment!
    if(!req.user.username){
      return res.status(401)
    }
    if(err){
      console.log(err)
      res.status(500)
      return next(err)
    } else
    {return res.status(200).send(comments)}
  })
 });


// Post One
commentRouter.post("/:issueId", (req, res, next) => {
  req.body.userId = req.user._id
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
commentRouter.get("/byId/:commentId", (req, res, next) => {
  console.log("inside get by id");
  const commentId = req.params.commentId;
    Comment.findOne({_id: commentId}, function(err, foundComment) {
    if (err) {
      console.log(err);
      res.status(500)
      return next(err)
    } 
  console.log(commentId)
  if(!foundComment){
    const error = new Error(`The item with id ${commentId} was not found.`)
    res.status(404)
    return next(error)
  }
  console.log(foundComment);
  return res.status(200).send(foundComment);
}) });


// Get by username
commentRouter.get("/search/issue/:issue", (req, res, next) => {
  const issue = req.params.issue
  Comment.find({ issueId: issue}, (err, comment) => {
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
commentRouter.delete("/:commentId", (req, res, next) => {
  Comment.findOneAndDelete(
    {_id: req.params.commentId}, 
    (err, deletedItem) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted item ${deletedItem.body} from the database`)
    }
  )
})


// Update One
commentRouter.put("/:commentId", (req, res, next) => {
  Comment.findOneAndUpdate(
    { _id: req.params.commentId},
    req.body,
    {new: true},
    (err, updatedComment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedComment)
    }
  )  
})


module.exports = commentRouter