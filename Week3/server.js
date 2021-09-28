const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const expressJwt = require('express-jwt');


//Middleware for every request;
app.use(express.json());
app.use(morgan("dev"));

// New connect to Database
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/votedb');
  console.log("Connected to the DB")
}

//routes
app.use('/api', expressJwt({secret: process.env.SECRET, algorithms:['HS256']}))
app.use("/api/user", require("./Routes/userRouter"))
app.use("/auth", require("./Routes/authRouter"))
app.use("/api/issue", require("./Routes/issueRouter"))
 app.use("/api/comment",require("./Routes/commentRouter"))

//error handler
app.use((err, req, res, next) => {
  if(err.name === 'Unauthorized error'){
    res.status(err.status)
  }
    console.log(err)
    return res.send({errMsg: err.message})
})

app.listen(9000, () => {
    console.log("The App is listening on port 9000")
});
