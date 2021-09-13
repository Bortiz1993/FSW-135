const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');


//Middleware for every request;
app.use(express.json());
app.use(morgan("dev"));

//connect to database
mongoose.connect('mongodb://localhost:27017/moviesdb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log("Connected to the DB")
)


//routes
app.use("/movies", require("./Routes/movieRouter"))

//error handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

// app.use((err, req, res, next) => {
//   console.log(err);
//   if (err.name === "UnauthorizedError") {
//     res.status(err.status);
//   }
//   return res.send({ errMsg: err.message });
// });



app.listen(9000, () => {
    console.log("The App is listening on port 9000")
});