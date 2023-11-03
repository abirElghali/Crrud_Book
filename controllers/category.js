const Book = require("../models/book")
const Author = require("../models/author")
const  Category = require ("../models/category")


const addCat = async(req,res) => {
        const category = new Category(req.body)      

        await category.save().then(() => 
        res.status(201).json({
            model: category,
            message: "objet crée!"
        })
        )
        .catch((error) => res.status(400).json({error:error.message})) 
}

const getCatById =(req,res) => {
        Category.findOne({_id: req.params.id})
        .then((category) => {
            if(!category){
                res.status(404).json({
                    message: "objet non trouvé",
                })
                return
            }
            res.status(200).json({
                model: category,
                message: "objet trouvé",
            })
        })
}

const getNomCatById = (req, res) => {
    Category.findOne({ _id: req.params.id })
      .then((category) => {
        if (!category) {
          res.status(404).json({
            message: "Catégorie non trouvée",
          });
          return;
        }
  
        res.status(200).json({
          title: category.title, // Renvoie le titre de la catégorie
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  };
  

const  updateCat =(req,res) => {
    Category.findByIdAndUpdate({_id: req.params.id},
        req.body, {new: true})
    .then((category) => {
        if (!category) {
            res.status(404).json({
                message: "objet non trouvé"
            })
            return
        }
        else{
            res.status(200).json({
                model:category,
                message: "objet modifié"
            })
        }
    })
    .catch((error) => res.status(400).json({error: error.message})) 
}

const fetchCats =(req,res) => {
    Category.find()
    .then((categorys) => {
        res.status(200).json({
            model: categorys,
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
module.exports = {
    addCat: addCat,
    getCatById: getCatById,
    updateCat: updateCat,
    getNomCatById:getNomCatById,
    fetchCats:fetchCats
}