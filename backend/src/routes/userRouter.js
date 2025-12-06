import express from "express";

import { validateSignupFields, validateSignInFields } from "../middleware/validationMiddle.js";
import auth from "../middleware/AuthMiddle.js";

import{
    createUsers,
    confirmEmail,
    signIn,
    getProfile,
    updateProfile,
    getList,
    updateFavorite
} from "../controllers/userController.js";

const UserRouter = express.Router();

UserRouter.post("/sign_up",validateSignupFields, createUsers);
UserRouter.put("/confirm/:token", confirmEmail);
UserRouter.post("/sign_in", validateSignInFields, signIn);

//Rutas protegidas
UserRouter.get("/profile", auth, getProfile);
UserRouter.put("/profile", auth, updateProfile);
UserRouter.get("/mylist", auth, getList);
UserRouter.post("/mylist", auth, updateFavorite);

export default UserRouter;