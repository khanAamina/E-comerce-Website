const Products = require('../models/product.js')

exports.getProducts = (req, res, next) => {
    Products.find().then(products => {
      res.status(200).render('product',{PageTitle:'E-Commerce-Products' ,products :products});
    })
}

exports.getProduct_dashboard = (req, res, next) => {
    Products.find().then(products => {
      res.status(200).render('dashboard',{PageTitle:'E-Commerce:Homepage' ,products :products});
    })
}

exports.postProducts= (req, res, next) => {
    const product_id = req.body.productid ? req.body.productid : null;
    const Product_Name = req.body.Product_Name;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Products({
        _id:product_id ,
        Product_Name:Product_Name,
        price:price,
        description:description,
    });
    product.save().then(result=>{
        console.log('product added ', product.Name)
    }).catch(err=>{
        console.log(err);
    })
    res.redirect("/homepage");
}


// /**
//  * Create a new user and returns it
//  * @param {Object} userInput - It is user input with all variables for user model
//  */
// const addProduct = async (userInput) => {

//   const product = new Products(userInput)
//   await product.save()
//   return product
// }

// module.exports = {addProduct}