const Comment = require("../models/Comment.model");
const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/jwt.middleware.js");

//new comment

router.post("/", async (req, res) => {
    try{
        const {recipeId, comment} = req.body;
        const userId = req.user._id;
        const newComment = new Comment({user: userId, recipe: recipeId, newComment});
        await newComment.save();
        res.status(201).json(newComment);

    } 
    catch (error) {
        res.status(500).json({error: "Error creating a comment"});
    }
});

//for specific recipes

router.get("/:recipeId", async (req, res)=> {
    try {
        const recipeId = req.params.recipeId;
        const comments = await Comment.find({recipe: recipeId}).populate("user");
        res.status(200).json(comments); 
    }
    catch (error) {
        res.status(500).json({error: "Error fetching comments"});
    }
});

module.exports = router;