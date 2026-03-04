/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         user: { type: string, description: "User ID" }
 *         userName: { type: string }
 *         text: { type: string }
 *         createdAt: { type: string, format: date-time }
 * 
 *     Post:
 *       type: object
 *       required:
 *         - text
 *       properties:
 *         _id: { type: string }
 *         user: { type: string, description: "Author User ID" }
 *         userName: { type: string }
 *         text: { type: string, example: "This is my first post on Techzu Social!" }
 *         likes: 
 *           type: array
 *           items: { type: string }
 *           description: "Array of User IDs who liked the post"
 *         comments:
 *           type: array
 *           items: { $ref: '#/components/schemas/Comment' }
 *         createdAt: { type: string, format: date-time }
 *
 * /posts:
 *   get:
 *     summary: Retrieve newsfeed posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: username
 *         schema: { type: string }
 *         description: Filter posts by a specific username
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: List of posts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: 
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Post' }
 * 
 *   post:
 *     summary: Create a new text post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text: { type: string, example: "Hello World!" }
 *     responses:
 *       201:
 *         description: Post created successfully
 *       401:
 *         description: Unauthorized
 * 
 * /posts/{id}/like:
 *   post:
 *     summary: Toggle Like/Unlike on a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: The Post ID
 *     responses:
 *       200:
 *         description: Success (Liked or Unliked)
 *       404:
 *         description: Post not found
 * 
 * /posts/{id}/comment:
 *   post:
 *     summary: Add a comment to a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text: { type: string, example: "Great post!" }
 *     responses:
 *       201:
 *         description: Comment added successfully
 */