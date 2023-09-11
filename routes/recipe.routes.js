const Recipe = require("../models/Recipe.model");
const router = require("express").Router();

const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middlewares/jwt.middleware.js");
const CommentRating = require("../models/CommentRating.model");

// GET /recipes - For getting all receipes
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const {bodyType, ut} = req.payload;
    const requestPayload = (ut === 1) ? {} : {bodyType}

    const recipes = await Recipe.find(requestPayload);
    res.status(200).json(recipes);
  } catch (error) {
    console.log("error fetching recipes", error);
    res.status(500).json({ error: "Error fetching recipes" });
  }
});

// POST /recipes/create  -  For creating single receipe
router.post("/create", fileUploader.single("recipeImage"), (req, res) => {
  const { title, instructions,ingredients, bodyType, mealType, cookingTime } = req.body;
  const recipeImage = req.file ? req.file.path : null; // Assign the path of the uploaded file
  console.log("file is:", req.file);
 
  if (!recipeImage) {
    return res.status(400).json({ error: "No photo uploaded!" });
  }

  Recipe.create({ title, recipeImage, ingredients, instructions, bodyType, mealType, cookingTime })
    .then((createdRecipes) => {
      console.log("Recipes created:", createdRecipes);
      res.status(201).json(createdRecipes);
    })
    .catch((error) => {
      console.error("Error creating recipes:", error);
      res.status(500).json({ error: "Error creating recipe" });
    });
});

// POST /recipes/:recipeId - For getting single receipe. recipeId is the path param, example /recipes/64fcec4d12b54b87311b10ec
router.get("/:recipeId", isAuthenticated, async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { email } = req.payload;

    const singleRecipe = await Recipe.findById(recipeId);
    if (!singleRecipe) {
      res.status(404).json({ message: "Recipe not found" });
    }

    const commentsAndRatings = await CommentRating.find({recipe: recipeId})
    .populate("user", ["username", "email"]);

    let averageRating = 0;
    let isUserRatedAndCommented = false;

    if (commentsAndRatings.length > 0) {
      let totalRating = 0
      commentsAndRatings.forEach(commentAndRating => {
        totalRating += commentAndRating.rating
        if(commentAndRating.user.email === email) {
          isUserRatedAndCommented = true
        }
      })
      averageRating = totalRating / commentsAndRatings.length;
    }

    res.status(200).json({singleRecipe, commentsAndRatings, averageRating, isUserRatedAndCommented});

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/edit/:recipeId",fileUploader.single("recipeImage"),(req, res) => {
    const recipeId = req.params.recipeId;
    const { title, ingredients, instructions, bodyType, mealType, cookingTime } = req.body;

    const updatedForm = {
      title,
      recipeImage: req.file ? req.file.path : undefined,
      ingredients,
      instructions,
      bodyType,
    };

    Recipe.findByIdAndUpdate(recipeId, updatedForm, { new: true })
      .then((updatedRecipe) => {
        if (!updatedRecipe) {
          return res.status(404).json({ message: "Recipe not found" });
        }
        res.json({ updatedRecipe });
      })
      .catch((err) => console.error(err));
  }
);

router.delete("/delete/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;

  Recipe.findByIdAndDelete(recipeId)
    .then((deletedRecipe) => {
      if (!deletedRecipe) {
        return res.status(404).json({ message: "recipe not found" });
      }
      res.json({ message: "Recipe deleted successfully" });
    })
    .catch((err) => console.error(err));
});




module.exports = router;
