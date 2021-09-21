const express = require('express');
const movieRouter = express.Router()
const Movie = require("./../Models/movie")


// Get All
movieRouter.get("/", (req, res, next) => {
 console.log(Movie)
  Movie.find((err, movies) => {

    console.log(movies)
    if(err){
      console.log(err)
      res.status(500)
      return next(err)
    } else
    {return res.status(200).send(movies)}
  })
 });


// Post One
movieRouter.post("/", (req, res, next) => {
  const newMovie = new Movie(req.body)
  newMovie.save((err, savedMovie) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedMovie)
  })
  
  return res.status(201).send(newMovie)
})


// Get One
movieRouter.get("/:movieId", (req, res, next) => {
  console.log("inside get by id");
 
  const movieId = req.params.movieId;
  

    Movie.findOne({_id: movieId}, function(err, foundMovie) {
    if (err) {
      console.log(err);
      res.status(500)
      return next(err)
    } 

  console.log(movieId)
  if(!foundMovie){
    const error = new Error(`The item with id ${movieId} was not found.`)
    res.status(404)
    return next(error)
  }
  console.log(foundMovie);
  return res.status(200).send(foundMovie);
}) });


// Get by genre
movieRouter.get("/search/genre", (req, res, next) => {
  const genre = req.query.genre
  Movie.find({genre:genre}, (err, movie) => {
    if(!movie){
      const error = new Error("You must provide a genre")
      res.status(500)
      return next(error)
    }
   return res.status(200).send(movie)
  }
)})


// Delete One
movieRouter.delete("/:movieId", (req, res, next) => {
  Movie.findOneAndDelete(
    {_id: req.params.movieId}, 
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
movieRouter.put("/:movieId", (req, res, next) => {
  Movie.findOneAndUpdate(
    { _id: req.params.movieId},
    req.body,
    {new: true},
    (err, updatedMovie) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedMovie)
    }
  )  
})


module.exports = movieRouter