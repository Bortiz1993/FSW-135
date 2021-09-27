const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({

    body: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    issueId: {
        type: Schema.Types.ObjectId,
        ref: "Issue",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})
module.exports = mongoose.model("Comment", commentSchema)

