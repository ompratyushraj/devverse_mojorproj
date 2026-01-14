import express from "express";
import { addToPlaylist, googleLogin, login, logout, MyProfile, register, updateBio, UpdateProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";
const router=express.Router();


//routes
   router.post('/register',singleUpload,register);
   router.post('/login',login);
      router.post('/updatebio',isAuthenticated,updateBio);
   router.post('/googlelogin',googleLogin);
  router.get("/addtoplaylist/:id",isAuthenticated,addToPlaylist)
   router.get('/logout',isAuthenticated,logout);
   router.get('/profile',isAuthenticated,MyProfile);
   router.post('/changeprofile',isAuthenticated,UpdateProfile)
   
export default router;