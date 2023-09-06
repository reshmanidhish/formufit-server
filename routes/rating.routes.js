const Rating = require("../models/Rating.model");
const router = require("express").Router();

router.post('/', async (req, res) => {
    try {
        const {recipeId, rating} = req.body;
        const userId = req.payload;
    
        const newComment = await Comment.create({user: userId, recipe: recipeId, rating});
        res.status(201).json(newComment); 
    }
    catch (error) {
        res.status(500).json({error: "Error creating a rate"});
    }
})

module.exports = router;