const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan')
const app = express();

//middleware (for query request)

app.use(express.json());
app.use(morgan('dev'));

//Connect to data base.
mongoose.connect('mongodb://localhost:27017/moviesdb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log("Connected to the DB")
)

app.get('/', (req, res) => {
    res.send("Good morning, Dave.");
})

//error handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
});

app.listen(3000, () => {
    console.log("The app is listening on port 3000.")
});