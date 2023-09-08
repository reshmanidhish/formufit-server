const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const saltRounds = 10;

const router = require("express").Router();

const { isAuthenticated } = require("../middlewares/jwt.middleware");

//SIGNUP

router.post("/signup", (req, res, next) => {
    const { email, password, username, userType } = req.body;
 
    // Check if the email or password or username.... is provided as an empty string 
    if (email === '' || password === '' || username === '') {
      res.status(400).json({ message: "Provide email, password and name" });
      return;
    }
   
    // Use regex to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: 'Provide a valid email address.' });
      return;
    }
    
    // Use regex to validate the password format
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
      return;
    }
   
   
    // Check the users collection if a user with the same email already exists
    User.findOne({ email })
      .then((foundUser) => {
        // If the user with the same email already exists, send an error response
        if (foundUser) {
          res.status(400).json({ message: "User already exists." });
          return;
        }
   
        // If the email is unique, proceed to hash the password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
   
        // Create a new user in the database
        // We return a pending promise, which allows us to chain another `then` 
        return User.create({ email, password: hashedPassword, username, userType});
      })
      .then((createdUser) => {
        // Deconstruct the newly created user object to omit the password
        // We should never expose passwords publicly
        const { email, username, _id, userType } = createdUser;
      
        // Create a new object that doesn't expose the password
        const user = { email, username, _id, userType };
   
        // Send a json response containing the user object
        res.status(201).json({ user: user });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
      });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

// Check if email or password are provided as empty string 
if (email === '' || password === '') {
  res.status(400).json({ message: "Provide email and password." });
  return;
}

// Check the users collection if a user with the same email exists
User.findOne({ email })
  .then((foundUser) => {
    if (!foundUser) {
      // If the user is not found, send an error response
      res.status(401).json({ message: "User not found." })
      return;
    }

    // Compare the provided password with the one saved in the database
    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

    if (passwordCorrect) {

      const {_id, email, username, isPremium = false, weight, height,  userType, bodyType = "", lifestyle="",bmi} = foundUser

      const payload = { _id, email, username,  pu: isPremium? 1: 0, weight, height, userType, lifestyle, bmi,"ut": userType==='admin'? 1: 0, bodyType};

      // Create and sign the token
      const authToken = jwt.sign( 
        payload,
        process.env.TOKEN_SECRET,
        { algorithm: 'HS256', expiresIn: "6h" }
      );

      // Send the token as the response
      res.status(200).json({ authToken: authToken, message: "Login was successful" });
    }
    else {
      res.status(401).json({ message: "Unable to authenticate the user" });
    }

  })
  .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

router.get('/verify', isAuthenticated, (req, res, next) => { 
  res.status(200).json(req.payload);
});

router.get('/refresh', isAuthenticated, (req, res, next) => {
  const {_id} = req.payload
 
  User.findById(_id)
  .then(userInfo => {
    if (!userInfo) {
      return res.status(404).json({message:"not found"});
    }

    const {_id, email, username, isPremium = false, weight, height, userType, bodyType = "", lifestyle="",bmi} = userInfo

    const payload = { _id, email, username, pu: isPremium? 1: 0, weight, height, userType, lifestyle, bmi,"ut": userType==='admin'? 1: 0, bodyType};
  
    const authToken = jwt.sign( 
      payload,
      process.env.TOKEN_SECRET,
      { algorithm: 'HS256', expiresIn: "6h" }
    );
  
    res.status(200).json({ authToken: authToken});
  })
  .catch(err => console.error(err))
})

module.exports = router;