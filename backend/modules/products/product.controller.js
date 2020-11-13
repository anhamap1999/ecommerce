import Product from './product.model'
import { getToken } from '../../utils/ultil';

exports.getProduct = async (req , res )=> {
   
    const products = await Product.find({});
    res.send(products);
};
exports.getProductdetails = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found.' });
    }
  };
exports.saveProduct = async ( req, res)=>{
    const product = new Product({
        name : req.body.name,
        image : req.body.image,
        brand : req.body.brand,
        price : req.body.price,
        rating : req.body.rating,
        description: req.body.description,
        stock : req.body.stock,
        numReviews : req.body.numReviews,
    });
    
    const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send({ message : 'new product created' , data:newProduct});
    }
    else {
        return res.status(401).send({ message : 'failed'});
    }
};
exports.updateProduct = async (req,res)=>{
    
    const productId = req.params.id;
    console.log("a");
    console.log('ID', productId)
    console.log('BODY', req.body);
    const product = await Product.findById(productId);
    if(product){
        product.name = req.body.name;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.price = req.body.price; 
        product.description= req.body.description;
        product.stock = req.body.stock;
        
        const updateproduct = await product.save();
        
        if (updateproduct) {
             return res.status(200).send({ message : 'Product updated' , data:updateproduct});
        }  
    }
     return res.status(500).send({ message : 'failed'});
};
exports.deteleProduct = async (req,res) => {
    const deletepro = await Product.findById(req.params.id);
    if(deletepro){
        await deletepro.remove();
        res.send({msg: 'deleted'});
    }
    else{
        res.send({msg: 'failed'});
    }
}