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
//router.post("/", bookController.addBook)

//router.post("/", bookController.addBook2)

router.post('/', async (req, res) => {
  try {
    // Validation du livre avec mongoose
    const newBook = new Book(req.body);
    await newBook.validate();

    // Vérification si l'auteur a écrit d'autres livres
    const authorId = req.body.author;
    const authorBooksCount = await Book.countDocuments({ author: authorId });

    if (authorBooksCount > 0) {
      await newBook.save();
      res.status(201).json(newBook);
    } else {
      res.status(400).json({ message: 'L\'auteur doit avoir écrit d\'autres livres avant.' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


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