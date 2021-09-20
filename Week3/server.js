const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');


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
app.use("/user", require("./Routes/userRouter"))
app.use("/auth", require("./Routes/authRouter"))

//error handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

app.listen(9000, () => {
    console.log("The App is listening on port 9000")
});
