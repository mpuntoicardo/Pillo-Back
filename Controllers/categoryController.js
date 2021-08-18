const Category = require('../Models/item').category;
const Subcategory = require('../Models/item').subcategory;


function createCategory(req, res){

        const {name, description} = req.body;
        const category = new Category({
            name, 
            description
        });
        category.save((error, categorySaved)=>{
            if(error || !categorySaved)return res.status(400).send({message:'Bad request, please try again.', error, success: false});
            return res.status(200).send({message:'Category saved successfully.', category: categorySaved, success: true});
        });
}
//Devuelve todas las categorías y subcategorías
function getCategories(req, res){
    Category.find({}).populate('subcategories').then((categories)=>{
        if(!categories) return res.status(404).send({message:'No categories found.', success: true, date: Date()});
        return res.status(200).send({message:'Categories found successfully.', categories, success: true, date: Date()});
    }).catch((error)=>{
        return res.status(500).send({message:'Error finding categories.', success: false, error});
    })
}
//Devuelve una única categoría
async function getCategory(req, res){
    try{
        const {name, id} = req.body;
        const category = await Category.findOne({$or:[{'_id': id},{'name': name}]}).populate('subcategories');
        if(!category) return res.status(404).send({message:'No category found.', success: true, date: Date()});
        return res.status(200).send({message:'Category found successfully.', category, success: true, date: Date()});
    }catch(error){
        return res.status(500).send({message:'Error finding category.', success: false, error});
    }

}
//Eliminar una categoría y subcategorías de la misma
async function deleteCategory(req,res){
    const {id} = req.params;
    var subcategoriesDeleted = []
    Category.findByIdAndDelete(id,(err, categoryDeleted)=>{
        if(err || !categoryDeleted) return res.status(404).send({message:'No category found.', success: false, date: Date()});
        try {
            if(categoryDeleted.subcategories){
                categoryDeleted.subcategories.forEach(async element => {
                    const subcategoryDeleted = await Subcategory.findOneAndDelete({_id: element});
                    subcategoriesDeleted.push(subcategoryDeleted);
                });
                return res.status(200).send({message:'Category and subcategories successfully deleted.', categoryDeleted, success: true, date: Date()});
            }
            return res.status(200).send({message:'Category deleted successfully.', categoryDeleted, success: true, date: Date()});
        } catch (error) {
                return res.status(500).send({message:'Error deleting subcategory.', success: false, error: error.message});
        }
    });
}


module.exports = {
    createCategory,
    getCategories,
    getCategory,
    deleteCategory
}
