const express = require('express');
const movie = require('./../Models/movie');
const movieRouter = express.Router()
const Movie = require("./../Models/movie")


// Get All
movieRouter.get("/", (req, res, next) => {
  // console.log(Movie)
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
  const movieId = req.params.movieId
  const foundMovie = movies.find(movie => movie._id === movieId)
  if(!foundMovie){
    const error = new Error(`The item with id ${movieId} was not found.`)
    res.status(500)
    return next(error)
  }
  return res.status(200).send(foundMovie)
})


// Get by genre
movieRouter.get("/search/genre", (req, res, next) => {
  const genre = req.query.genre
  if(!genre){
    const error = new Error("You must provide a genre")
    res.status(500)
    return next(error)
  }
  const filteredMovies = movies.filter(movie => movie.genre === genre)
  return res.status(200).send(filteredMovies)
})


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