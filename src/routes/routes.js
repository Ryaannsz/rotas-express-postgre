import express from 'express'
import userController from '../controllers/user.controller.js'
import verifyToken from '../middleware/jwt.verify.token.js';
import protectedController from '../controllers/protected.controller.js'


const router = express.Router();

router.get("/protected", verifyToken, protectedController.getProtected);

router.post("/register", userController.saveEntity);

router.post("/login", userController.loginEntity);

export default router