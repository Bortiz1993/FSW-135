const express = require('express');
const issueRouter = express.Router()
const Issue = require("./../Models/issue")


// Get All
issueRouter.get("/", (req, res, next) => {
 console.log(Issue)
  Issue.find((err, issues) => {
     console.log(Issue)
    if(err){
      console.log(err)
      res.status(500)
      return next(err)
    } else
    {return res.status(200).send(issues)}
  })
 });


// Post One
issueRouter.post("/", (req, res, next) => {
  req.body.user = req.user._id
  //for the comment router
  //req.body.username = req.user.username
  //req.boyd.issueId = req.params.issueId
  const newIssue = new Issue(req.body)
  newIssue.save((err, savedIssue) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedIssue)
  })
  
})


// Get One
issueRouter.get("byId/:issueId", (req, res, next) => {
  console.log("inside get by id");
 
  const issueId = req.params.issueId;
  
    Issue.findOne({_id: issueId}, function(err, foundIssue) {
    if (err) {
      console.log(err);
      res.status(500)
      return next(err)
    } 

  console.log(issueId)
  if(!foundIssue){
    const error = new Error(`The item with id ${issueId} was not found.`)
    res.status(404)
    return next(error)
  }
  console.log(foundIssue);
  return res.status(200).send(foundIssue);
}) });


// Get by title
issueRouter.get("/search/title", (req, res, next) => {
  const title = req.query.title
  Issue.find({ title: title}, (err, issue) => {
    if(!issue){
        const error = new Error("You must provide a user name")
        res.status(500)
        return next(error)
      }
      return res.status(200).send(issue)
  }
 
)})


issueRouter.get('/search', (req, res, next) => {
    const { issue} = req.query
    console.log(issue)

    const pattern = new RegExp(issue)
    console.log(pattern)
    Issue.find (
      {title: { $regex: pattern, $options: 'i' } }, 
      (err, issues) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(issues)
      }
    )
  })


// Delete One
issueRouter.delete("/:issueId", (req, res, next) => {
  Issue.findOneAndDelete(
    {_id: req.params.issueId}, 
    (err, deletedItem) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted item ${deletedItem.title} from the database`)
    }
  )
})


// Update One
issueRouter.put("/:issueId", (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId},
    req.body,
    {new: true},
    (err, updatedIssue) => {
      if(err){ res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedIssue)
    }
  )  
})

issueRouter.put("/:issueId/upvote", (req, res, next) => {
    Issue.findOneAndUpdate(
      { _id: req.params.issueId},
      {
          $inc: {
              upvote: 1
          }
      },
      {new: true},
      (err, updatedIssue) => {
        if(err){ res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedIssue)
      }
    )  
  })

  issueRouter.put("/:issueId/downvote", (req, res, next) => {
    Issue.findOneAndUpdate(
      { _id: req.params.issueId},
      {$inc: {
          downvote:1
      }
    },
      {new: true},
      (err, updatedIssue) => {
        if(err){ res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedIssue)
      }
    )  
  })




module.exports = issueRouter