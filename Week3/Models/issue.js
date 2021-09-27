const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  imgUrl: {
    type: String,
    required: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

 voters:{
    type:Array,
    default: []
  },

  // comments model?
  downvote: {
    type: Number,
    default: 0
    
  },

  upvote:{
    type: Number,
    default: 0

  }
})

module.exports = mongoose.model("Issue", issueSchema)

