//permet de modifier un Book
const express = require("express")
const router = express.Router()
const authorController = require ("../controllers/author")


/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: The authors managing API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - firstName
 *          -lastName
 *         - nationalty
 *       properties:
 *         firstName:
 *           type: string
 *           description: The task title
 *         lastName:
 *           type: string
 *           description: The task duration
 *         nationalty:
 *           type: string
 *           description: The task description
 *       example:
 *         title: learn react
 *         duration: 130
 *         description: learn the fundamentals of react
 *     Task:
 *          allOf:
 *              - type: object
 *                properties:
 *                  _id:
 *                      type: string
 *                      description: The auto-generated id of the task
 *              - $ref: '#/components/schemas/nwAuthor'
 */

router.patch(":id", authorController.updateAuthor)

//permet de supprimer un Book selon ID 
router.delete(":id", authorController.deleteAuthor)

//retourne la liste de tous les Book avec ses champs
router.get("/", authorController.fetchAuthors)
/**
 * @swagger
 * /author:
 *   get:
 *     summary: List all the tasks
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/schemas/'
 *       500:
 *         description: Some server error
 */



//affiche un Book selon id en paramétre
router.get("/:id", authorController.getAuthorById)
/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: get a task by id
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task id
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: The auto-generated id of the task
 *                      example: 1dzf5f5jbjv5555
 *                  title:
 *                      type: string
 *                      description: The title of your task
 *                      example: learn react
 *                  duration:
 *                      type: string
 *                      description: The task duration
 *                      example: 150,
 *                  description:
 *                      type: string
 *                      description: The task description
 *                      example: learn the fundamentals of react
 *       404:
 *         description: Object not found
 *       500:
 *         description: Some server error
 */

//création d'un objet Book
router.post("/", authorController.addAuthors)
/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new task
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: The auto-generated id of the task
 *                      example: 1dzf5f5jbjv5555
 *                  firstName:
 *                      type: string
 *                      description: The title of your task
 *                      example: learn react
 *                  lastName:
 *                      type: string
 *                      description: The task duration
 *                      example: 150,
 *                  nationality:
 *                      type: string
 *                      description: The task description
 *                      example: learn the fundamentals of react
 *       400:
 *         description: Bad request. You may need to verify your information.
 *       500:
 *         description: Some server error
 *
 */



module.exports=router