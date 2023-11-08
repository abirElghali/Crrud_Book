const Book = require("../models/book")
const Author = require("../models/author")
const  Category = require ("../models/category")

const fetchBooks = async (req,res) => {
        await Book.find()
        .populate("author","category")
        .exec()
        .then((books) => {
            res.status(200).json({
                model: books,
                message: "success",
            })
        })
        .catch((error) => {
            res.status(400).json({
                error: error.message,
                message: "probléme d'extraction",
            })
        })
    
}
// const addBook = async(req,res) => {
//         const book = new Book(req.body)

//         const author = await Author.findOne({_id: req.params.author})
//             if(!author){
//                 res.status(404).json({
//                     message: "auteur non trouvé",
//                 })
//                 return
//             }
//         await book.save().then(() => 
//                 res.status(201).json({
//                     model: book,
//                     message: "objet crée avec succés !"
//                 })
//                 )
//         // const category = Category.findOne({_id: req.params.category})
//         // console.log(author, category)
//         .catch((error) => res.status(400).json({error: error.message})) 

// }

const addBook = async (req, res) => {
    try {
      const author = await Author.findOne({ _id: req.params.author });
      const category = await Category.findOne({ _id: req.params.category });


       //knraja3ha dima yodhhorli auteur non trouvé w hatta kano shih l _id de l'auteur
      if (!author) {
        return res.status(404).json({
          message: "Auteur non trouvé",
        }); 
      }

        if (!category) {
                return res.status(404).json({
                  message: "category non trouvé",
                }); 
              }
              
                const book = new Book(req.body);
                await book.save();
          
                //m yhbch yaaml exécution l hadhuma zoz
                  // category.books.push(book._id);
                  // await category.save();
          
                return res.status(201).json({
                  model: book,
                  message: "Livre créé avec succès !"
                });
              
    } 
    catch (error) 
    {
      return res.status(400).json({ error: error.message });
    }
  }
  
const getBookById = async(req,res) => {
      try {
        await Book.findOne({_id: req.params.id})
        .populate("author")
        .populate("category")
        .exec()
        .then((book) => {
            if(!book){
                res.status(404).json({
                    message: "objet non trouvé",
                })
                return
            }
            res.status(200).json({
                model: book,
                message: "objet trouvé",
            })
        })
      }
      catch (error) 
    {
      return res.status(400).json({ error: error.message });
    }
    //djhdhbqjsdhsqjd       
}
const  updateBook =(req,res) => {
        // console.log(req.body)
        // res.send(req.params.id)
        Book.findByIdAndUpdate({_id: req.params.id},
            req.body, {new: true})
        .then((book) => {
            if (!book) {
                res.status(404).json({
                    message: "objet non trouvé"
                })
                return
            }
            else{
                res.status(200).json({
                    model:book,
                    message: "objet modifié"
                })
            }
        })
        .catch((error) => res.status(400).json({error: error.message})) 
}
const deleteBook =(req,res) => {
        // console.log(req.params.id)
        Book.deleteOne({ _id: req.params.id})
        .then(() => res.status(200).json({message: "objet supprimé"}))
        .catch((error) => res.status(400).json({error}))
}

module.exports = {
    fetchBooks: fetchBooks,
    addBook: addBook,
    getBookById: getBookById,
    deleteBook: deleteBook,
    updateBook: updateBook
}