const express = require('express')
const authRouter = express.Router()
const User = require('../Models/user.js')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')



// Signup
authRouter.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(user){
      res.status(403)
      return next(new Error("That username is already taken"))
    }
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
      if(err){
        res.status(500)
        return next(err)
      }
                            // payload,            // secret
      const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
      return res.status(201).send({ token, user: savedUser.withoutPassword() })
    })
  
  })
})

// Login
authRouter.post("/login", (req, res, next) => {
  console.log(req.body)
  const failedLogin = 'Username and or Password is incorrect'
  User.findOne({ username: req.body.username }, (err, user) => {
    console.log(user)
    if(err){
      res.status(500)
      return next(err)
    }
    if(!user){
      res.status(403)
      return next(new Error(failedLogin))
    }
   user.checkPassword(req.body.password, (err, isMatch) => {
     if (err) {
       res.status(403)
       return next(new Error(failedLogin))
     }
     if(!isMatch){
       res.status(403)
       return next(new Error(failedLogin))
     }
  
    const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
     //SET a cookie?
    app.get('/setCookie', (req, res) =>{
      res.cookie('Chip', 'eValue');
      res.send('Cookie has been saved successfully')
    })
    //cookie value?
    app.get('/getCookie', (req, res) => {
      console.log(req.cookies)
      res.send(req.cookies);
    })
    
    return res.status(200).send({ token, user: user.withoutPassword() })
  })
  })
})


module.exports = authRouter