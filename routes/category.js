const express = require("express")
const router = express.Router()
const categoryController = require ("../controllers/category")

//permet de modifier un Book
//router.patch(":id", categoryController.updateBook)

//permet de supprimer un Book selon ID 
//router.delete(":id", categoryController.deleteBook)

//retourne la liste de tous les Book avec ses champs
//router.get("/", categoryController.fetchCats)

//affiche un Book selon id en paramétre
//router.get(":id", categoryController.getCatById)

//création d'un objet Book
router.post("/", categoryController.addCat)


router.get("/:id",categoryController.getNomCatById)

module.exports=router