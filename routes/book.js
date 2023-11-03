//permet de modifier un Book
const express = require("express")
const router = express.Router()
const bookController = require ("../controllers/book")

router.patch(":id", bookController.updateBook)

//permet de supprimer un Book selon ID 
router.delete(":id", bookController.deleteBook)

//retourne la liste de tous les Book avec ses champs
router.get("/", bookController.fetchBooks)

//affiche un Book selon id en paramétre
router.get("/:id", bookController.getBookById)

//création d'un objet Book
router.post("/", bookController.addBook)

module.exports=router