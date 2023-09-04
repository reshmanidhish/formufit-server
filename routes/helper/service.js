const Recipe = require("../../models/Recipe.model");
const Fitness = require("../../models/Fitness.model");

const getRandomRecipe = async (bodyType, mealType) => {
  try {
    const recipe = await Recipe.findOne({ bodyType, mealType });
    return recipe || {};
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return {};
  }
}


const getRandomFitness  = async (bodyType)  => {
  try {
    const fitness = await Fitness.findOne({ bodyType });
    return fitness;
  } catch (error) {
    console.error("Error fetching fitness:", error);
    return {};
  }
}

module.exports = {getRandomRecipe, getRandomFitness}