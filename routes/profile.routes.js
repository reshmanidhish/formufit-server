const User = require("../models/User.model");
const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middlewares/jwt.middleware.js");

 //uploading recipe image
 router.post("/upload", fileUploader.single("profileImage"),(req,res,next) => {
    console.log("file is:", req.file)
    if (!req.file){
        next(new Error("no photo uploaded!"));
        return;
    }
     // Get the URL of the uploaded file and send it as a response.
     // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
  });

  router.put("/edit/:id", (req, res) => {
    const userId = req.params.id;
    const {username, password, city,country, weight, height, profileImage}=req.body;

    const updatedForm ={username, password,city,country, weight, height, profileImage};
  
    User.findByIdAndUpdate(userId, updatedForm, {new:true})
      .then(updatedInfo => {
       if (!updatedInfo) {
        return res.status(404).json({message:"not found"});
       }
        res.json({ updatedInfo })
      })
      .catch(err => console.error(err))
  })

module.exports = router;