import { Router } from "express";
import { check } from 'express-validator';
import UserController from "../controllers/UserController.js";
import { checkRoles } from "../middlewares/authMiddleware.js";


const router = Router();

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: API para gerenciamento de Usuarios
 */

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Endpoint requires authentication, access only for user ADMIN.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: All Users.
 *       '500':
 *         description: Internal Server Error.
 */

// Rota para exibir todos os Usuários
router.get('/users',  
    checkRoles(['ADMIN']),
    UserController.getAllUsers);


    /**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     description: Create a new user according to the json file properties.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       '201':
 *         description: The user was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: User already exists.
 *       '422':
 *         description: invalid credentials.
 *       '500':
 *         description: Internal Server Error.
 */

// Rota para criar um novo Usuário
router.post(
    '/register',
    [
        check('name').notEmpty().withMessage('Name is required'),
        check('email').isEmail().withMessage('Invalid email format'),
        check('password').isStrongPassword()
        .withMessage(`minLength: 8, minLowercase: 1,
        minUppercase: 1, minSymbols: 1`),
        
    ],
    UserController.register
);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     description: Endpoint to authenticate a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User login successfully. 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Invalid password.
 *       '404':
 *         description: User not found.
 *       '422':
 *         description: invalid format credentials.
 *       '500':
 *         description: Internal Server Error.
 */

// Rota de Login 
router.post(
    '/login',
    [
        check('email').isEmail().withMessage('Invalid email format'),
        check('password').isLength({ min: 6 })
            .withMessage('Password should be at least 6 chars long')
    ],
    UserController.login
);

/**
 * @swagger
 * /auth/users/{id}:
 *   put:
 *     summary: update a user by ID
 *     tags: [Users]
 *     description: Endpoint requires authentication, access only for user ADMIN
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found.
 *       '422':
 *         description: Authorization errors.
 *       '500':
 *         description: Internal Server Error
 */

// Atualizar um Filme com ID (Necessario inserir um Token de autenticacao com ROLE ADMIN no POSTMAN Em Authorization: Bearer <TOKEN>)
router.put(
    '/users/:id',
    checkRoles(['ADMIN']), // Middleware para verificar se o usuário tem a função de administrador
    UserController.updateUser
);

/**
 * @swagger
 * /auth/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     description: Endpoint requires authentication, access only for user ADMIN
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to deleted
 *         schema:
 *          type: string
 *     responses:
 *       '200':
 *         description: The user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal Server Error
 */

// Delete um usuario com ID (Necessario inserir um Token de autenticacao com ROLE ADMIN no POSTMAN Em Authorization: Bearer <TOKEN>)
router.delete(
    '/users/:id',
    [
        check('email').isEmail().withMessage('Invalid email.'),
        check('password').isLength({ min: 6 }).withMessage('Password should be at least 6 chars long'),
        check('role').isIn([ 'ADMIN']).withMessage('ADMIN')
    ],
    checkRoles(['ADMIN']), // Middleware para verificar se o usuário tem a função de administrador
    UserController.deleteUser
);




export default router;