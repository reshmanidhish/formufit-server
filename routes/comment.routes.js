const Comment = require("../models/Comment.model");
const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/jwt.middleware.js");

//new comment

router.post("/create", isAuthenticated, async (req, res) => {
    try{
        console.log("request body:", req.body);
        const {recipeId, comment} = req.body;
        console.log("payload:", req.payload)
        const userId = req.payload;
        console.log("recipeId:", recipeId);
        console.log("comment:", comment);
        console.log("userId", userId);
        const newComment = await Comment.create({user: userId, recipe: recipeId, comment});
        res.status(201).json(newComment);

    } 
    catch (error) {
        res.status(500).json({error: "Error creating a comment"});
    }
});

module.exports = router;