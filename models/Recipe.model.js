const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            required: true
          },
        image: {
            type: String,
            required: true
          },
        ingredients: {
            type: String,
            required: true
          },
        instructions: {
            type: String,
            required: true
          },
        bodyType: {
            type: String,
            required: true
          },
    }
)


// Connect to MongoDB and Atlas
mongoose.connect("mongodb+srv://didemaydin:shMWMd7eziE0Ijcs@cluster0.oaymbdf.mongodb.net/formufit")
.then(() => {
  console.log("Connected to MongoDB Atlas");

  // Create an array of recipe objects
const recipes = [
    {
        title: "Salmon Bowl",
        image: "../images/salmon bowl.jpg",
        ingredients: `1 tsp rapeseed oil
        2 tsp finely chopped ginger
        1 large garlic clove, finely chopped
        1 pepper (any colour), deseeded and finely chopped
        2 fresh or frozen wild salmon fillets (about 80g each; defrosted if frozen)
        250g pouch cooked brown rice
        4 spring onions, finely sliced
        1 small avocado, peeled, halved, stoned and sliced
        80g cucumber, halved lengthways and sliced
        chilli sauce to serve (optional)
        For the miso dressing
        4 tbsp kefir
        1 tsp white miso paste
        1 tsp honey`,
        instructions: `Heat the oil in a large non-stick pan or deep frying pan with a lid over a medium heat and cook the ginger, garlic and pepper for 2 mins, covered. Stir, then put the salmon on top, cover again and cook for 5 mins until the fish is cooked through.
        Meanwhile, mix the dressing ingredients together in a small bowl. Squeeze the pouch of rice to separate the grains, then tip the contents into a small pan with 2 tbsp water. Cover and cook for 2 mins.
        Stir the spring onions into the rice mixture along with half the dressing. Spoon into two bowls. Remove the skin from the salmon and flake the fish on top of the rice. Top with the pepper, avocado and cucumber, then drizzle over the remaining dressing and some chilli sauce, if using.`,
        bodyType: "Endomorph"
    },
    {
        title: "Banana Bread",
        image: "../images/banana bread.jpg",
        ingredients: `low-fat spread, for the tin, plus extra to serve
        140g wholemeal flour
        100g self-raising flour
        1 tsp bicarbonate of soda
        1 tsp baking powder
        300g mashed banana from overripe black bananas
        4 tbsp agave syrup
        3 large eggs, beaten with a fork
        150ml pot low-fat natural yogurt
        25g chopped pecan or walnuts (optional)`,
        instructions: `Heat oven to 160C/140C fan/gas 3. Grease and line a 2lb loaf tin with baking parchment (allow it to come 2cm above top of tin). Mix the flours, bicarb, baking powder and a pinch of salt in a large bowl.
        Mix the bananas, syrup, eggs and yogurt. Quickly stir into dry ingredients, then gently scrape into the tin and scatter with nuts, if using. Bake for 1 hr 10 mins-1 hr 15 mins or until a skewer comes out clean.
        Cool in tin on a wire rack. Eat warm or at room temperature, with low-fat spread.`,
        bodyType: "Endomorph"
    },
    {
        title: "Chia & almond overnight oats",
        image: "../images/chia banana oats.jpg",
        ingredients: `200g jumbo porridge oats
        50g chia seeds
        600ml unsweetened almond milk, plus 8 tbsp
        2 tsp vanilla extract
        125g punnet raspberries
        100g almond yogurt
        250g punnet blueberries
        20g flaked almonds, toasted`,
        instructions: `Tip the oats and seeds into a bowl and pour over the milk and vanilla extract. Leave for 5-10 mins for the oats to absorb some of the liquid.
        Reserve 16 raspberries, then add the remainder to the oats and crush them into the mixture. Spoon into four tumblers or sundae dishes, then top with the yogurt and both lots of berries. Cover and chill overnight or until needed. To serve, pour 2 tbsp almond milk over each and scatter with the almonds.`,
        bodyType: "Endomorph"
    }
];

// Insert the recipes into the database
Recipe.create(recipes)
.then(createdRecipes => {
  console.log("Recipes created:", createdRecipes);
})
.catch(error => {
  console.error("Error creating recipes:", error);
})
.finally(() => {
  mongoose.disconnect(); // Disconnect from the database when done
});
})
.catch(error => {
console.error("Error connecting to MongoDB Atlas:", error);
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
