import express from "express";
import {userCreation, userLogin} from "../controllers/userController.js";

const router = express.Router();

// Account management routes
router.post("/add-user", userCreation);
router.post("/user-login", userLogin);

export default router;