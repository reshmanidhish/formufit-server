const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
          },
        recipe: {
            type: Schema.Types.ObjectId,
            ref: "Recipe",
            required: true
          },
        comment: {
            type: String,
            required: true
          },
    }
)

const Comment = model("Comment", commentSchema);

module.exports = Comment;