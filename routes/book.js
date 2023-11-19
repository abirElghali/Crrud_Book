//permet de modifier un Book
const express = require("express")
const router = express.Router()
const bookController = require ("../controllers/book")
const Book = require("../models/book")

router.patch(":id", bookController.updateBook)

//permet de supprimer un Book selon ID 
router.delete(":id", bookController.deleteBook)

//retourne la liste de tous les Book avec ses champs
router.get("/", bookController.fetchBooks)

//affiche un Book selon id en paramétre
router.get("/:id", bookController.getBookById)

//création d'un objet Book
router.post("/", bookController.addBook)

//permet d afficher tous les book de meme author avec le param id
router.get('/author/:id', async (req, res) => {
    try 
    {
      const books = await Book.findByAuthor(req.params.id);
      res.json(books);
    } 
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


module.exports=router