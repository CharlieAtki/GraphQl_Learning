import express from "express";
import {getUsers, userCreation} from "../controllers/userController.js";

const router = express.Router();

// Fetching users from DB
router.get("/users", getUsers);

export default router;