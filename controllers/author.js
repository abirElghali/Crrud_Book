const Author = require("../models/author")

const fetchAuthors =(req,res) => {
    Author.find()
        .then((authors) => {
            res.status(200).json({
                model: authors,
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

const addAuthors = async (req,res) => {
        //console.log(req.body)
        const author = new Author(req.body)
        await author.save().then(() => 
        res.status(201).json({
            model: author,
            message: "objet crée!"
        })
        )
        // res.send(req.body)
}

const getAuthorById =(req,res) => {
    Author.findOne({_id: req.params.id})
        .then((author) => {
            if(!author){
                res.status(404).json({
                    message: "objet non trouvé",
                })
                return
            }
            res.status(200).json({
                model: author,
                message: "objet trouvé",
            })
        })
}
const  updateAuthor =(req,res) => {
        // console.log(req.body)
        // res.send(req.params.id)
        
        Author.findByIdAndUpdate({_id: req.params.id},
            req.body, {new: true})
        .then((author) => {
            if (!author) {
                res.status(404).json({
                    message: "objet non trouvé"
                })
                return
            }
            else{
                res.status(200).json({
                    model:author,
                    message: "objet modifié"
                })
            }
        })
        .catch((error) => res.status(400).json({error: error.message})) 
}
const deleteAuthor =(req,res) => {
        // console.log(req.params.id)
        Author.deleteOne({ _id: req.params.id})
        .then(() => res.status(200).json({message: "objet supprimé"}))
        .catch((error) => res.status(400).json({error}))
}

module.exports = {
    fetchAuthors: fetchAuthors,
    addAuthors: addAuthors,
    getAuthorById: getAuthorById,
    deleteAuthor: deleteAuthor,
    updateAuthor: updateAuthor
}