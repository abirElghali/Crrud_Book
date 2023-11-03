//permet de modifier un Book
const express = require("express")
const router = express.Router()
const authorController = require ("../controllers/author")

router.patch(":id", authorController.updateAuthor)

//permet de supprimer un Book selon ID 
router.delete(":id", authorController.deleteAuthor)

//retourne la liste de tous les Book avec ses champs
router.get("/", authorController.fetchAuthors)

//affiche un Book selon id en paramétre
router.get(":id", authorController.getAuthorById)

//création d'un objet Book
router.post("/", authorController.addAuthors)

module.exports=router