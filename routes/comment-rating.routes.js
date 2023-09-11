const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/jwt.middleware.js");
const CommentRating = require("../models/CommentRating.model");

//new comment

router.post("/", isAuthenticated, async (req, res) => {
    try{
        const {recipeId, comment, rating} = req.body;
        const userId = req.payload;
        const newComment = await CommentRating.create({user: userId, recipe: recipeId, comment, rating});
        res.status(201).json(newComment);
    } 
    catch (error) {
        res.status(500).json({error: "Error creating a comment"});
    }
});


module.exports = router;