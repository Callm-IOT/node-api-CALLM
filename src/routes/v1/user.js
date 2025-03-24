import { Router } from "express";
import { createUser, getUserById, updateUser, getAllMyUsers, createHomeUsers } from "../../controllers/User.js";
import { verifyToken } from "../../middlewares/Token.js";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for managing users
 */

const routerUser = Router();

/**
 * @swagger
 * /api/v1/users/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - lastName
 *               - phone
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's first name
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *               dob:
 *                 type: string
 *                 format: date
 *                 description: Date of birth (YYYY-MM-DD)
 *               phone:
 *                 type: string
 *                 description: Phone number in international format (+123456789)
 *                 default: "+123456789012"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               username:
 *                 type: string
 *                 description: Unique username
 *               password:
 *                 type: string
 *                 description: User's password
 *                 default: "P@titoLoco7"
 *               role:
 *                 type: string
 *                 enum: [Admin, User]
 *                 description: User's role
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request (e.g., weak password)
 */
routerUser.post("/create", createUser);

/**
 * @swagger
 * /api/v1/users/create-home-users:
 *   post:
 *     summary: Create home users
 *     description: Creates users associated with a home. Authentication is required.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               phone:
 *                 type: string
 *                 example: "+123456789"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 example: "Minecraft4ever@"
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "643d8f..."
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john@example.com"
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid token
 */
routerUser.post("/create-home-users", verifyToken , createHomeUsers);

/**
 * @swagger
 * /api/v1/users/all-users/:
 *   get:
 *     summary: Get all users by user ID (only accessible by Admin)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully fetched users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: User's first name
 *                       lastName:
 *                         type: string
 *                         description: User's last name
 *                       email:
 *                         type: string
 *                         description: User's email address
 *                       phone:
 *                         type: string
 *                         description: User's phone number
 *                       role:
 *                         type: string
 *                         enum: [Admin, User]
 *                         description: User's role
 *       403:
 *         description: Forbidden. Only admin can access.
 *       404:
 *         description: No users found for the given userId.
 *       500:
 *         description: Internal server error.
 */
routerUser.get("/all-users/", verifyToken, getAllMyUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
routerUser.get("/:id", getUserById);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               dob:
 *                 type: string
 *                 format: date
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
routerUser.put("/:id", updateUser);


export { routerUser };
