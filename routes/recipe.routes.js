const Recipe = require("../models/Recipe.model");
const router = require("express").Router();
const mongoose = require("mongoose");
const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middlewares/jwt.middleware.js");



  router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    }
    catch (error) {
        console.log("error fetching recipes", error);
        res.status(500).json({error: "Error fetching recipes"});
    }
})

    //uploading recipe image
  router.post("/upload", fileUploader.single("image"),(req,res,next) => {
    console.log("file is:", req.file)
    if (!req.file){
        next(new Error("no photo uploaded!"));
        return;
    }
     // Get the URL of the uploaded file and send it as a response.
     // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
  });

    router.post("/create", (req,res) => {
    const {title, recipeImage,ingredients,instructions, bodyType, adminId}=req.body;

// Insert the recipes into the database
Recipe.create({title, recipeImage,ingredients,instructions, bodyType, adminId})
.then(createdRecipes => {
  console.log("Recipes created:", createdRecipes);
  res.json(createdRecipes)
})
.catch(error => {
  console.error("Error creating recipes:", error);
});

})


module.exports = router;