import { Router } from "express";
import { check } from 'express-validator';
import UserController from "../controllers/UserController.js";
const router = Router();
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/register', [
    check('email').isEmail().withMessage('Invalid email.'),
    check('password')
        .isLength({ min: 5, max: 10 })
        .withMessage('Pwd should have 5 to 10 chars'),
    check('name').isLength({ min: 5 }).withMessage('Name should have at least 5 chars')
], UserController.registerUser);
export default router;
//# sourceMappingURL=user2Router.js.map