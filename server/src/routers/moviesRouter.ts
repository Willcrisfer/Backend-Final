import { Router } from "express";
import MoviesController from "../controllers/MoviesController.js";
import { checkRoles } from "../middlewares/authMiddleware.js";


const router = Router();

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: API para gerenciamento de Filmes
 */


/**
 * @swagger
 * /api/movies:
 *   get:   
 *     summary: Get all Movies
 *     tags: [Movies]
 *     description: Endpoint requires authentication, access only for logged in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of movies 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Movie'
 */

// Exibir todos os Filmes (Necessario inserir um Token de autenticacao no POSTMAN Em Authorization: Bearer <TOKEN>)
router.get('/movies',checkRoles(['USER','ADMIN']), MoviesController.getAllMovies);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     description: Create a new movie with the data sent in the request body.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieInput'
 *     responses:
 *       201:
 *         description: The movie was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 */

// cria um novo filme (Necessario inserir um Token de autenticacao com ROLE ADMIN no POSTMAN Em Authorization: Bearer <TOKEN>)
router.post('/movies',checkRoles(['ADMIN']), MoviesController.createMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update a movie by ID
 *     tags: [Movies]
 *     description: Endpoint requires authentication, access only for user ADMIN
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id 
 *         required: true
 *         description: ID of the movie to updated
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieInput'
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Internal Server Error
 */

// Atualiza um filme atraves do ID (Necessario inserir um Token de autenticacao com ROLE ADMIN no POSTMAN Em Authorization: Bearer <TOKEN>)
router.put('/movies/:id',checkRoles(['ADMIN']), MoviesController.updateMovie);

/**
 * @swagger
 * /api/movies/search:
 *   get:
 *     summary: Search movies specific
 *     tags: [Movies]
 *     description: Endpoint requires authentication, access only for logged in user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         required: true
 *         description: Filter movies for title or genre .
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search completed
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/Movie'
 */

// Busca filmes especificos co  filtro de (year, title, genre) (Necessario inserir um Token de autenticacao no POSTMAN Em Authorization: Bearer <TOKEN>)
router.get('/movies/search', checkRoles(['USER','ADMIN']), MoviesController.searchMovies);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID
 *     description: Endpoint requires authentication, access only for user ADMIN
 *     security:
 *       - bearerAuth: []
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the film to deleted
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Movie successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Internal Server Error
 */

// Delete um Filme com ID (Necessario inserir um Token de autenticacao com ROLE ADMIN no POSTMAN Em Authorization: Bearer <TOKEN>)
router.delete('/movies/:id',checkRoles(['ADMIN']),MoviesController.deleteMovie);


export default router;