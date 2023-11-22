const Author = require("../models/author")

const fetchAuthors = async (req,res) => {
    try 
    {
            const author= await Author.find()
            //console.log(Author.fullName)
            if (! author){
                res.status(400).json({
                    error: error.message,
                    message: "probléme d'extraction",
                })
            }
            res.status(200).json({
                model: author,
                message: "success",
            })
    }
    catch(error) {res.status(400).json({error: error.message})}
}

const addAuthors = async (req,res) => {
    try  {
         //console.log(req.body)
        const author = new Author({
        lastName:req.body.lastName,
        firstName:req.body.firstName,
        email: req.body.email,
        password: req.body.password,
        nationality:req.body.nationality
        })
        await author.save()
        if (!author) 
        {
            res.status(400).json({
                error: error.message,
                message: "probléme d'ajout",
            })
        }
        res.status(201).json({
            model: author,
            message: "objet crée!"
        })
        
        
        // res.send(req.body)
    }
    catch(error) {res.status(400).json({error: error.message})}

}


//sta3mltt l virtuall linnaa
const getAuthorById =(req,res) => {
    Author.findOne({_id: req.params.id})
        .then((author) => {
            if(!author){
                res.status(404).json({
                    message: "objet non trouvé"
                })
                return
            }

            //radditto MAJ
            const f1 = author.fullName.toUpperCase();
            const f2 = f1.trim();

            res.status(200).json({
                model: author,
                message: "objet trouvé",
                f1,f2
            })
            //res.status(200).json({f1})
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