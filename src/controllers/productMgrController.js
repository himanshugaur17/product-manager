const {
    getProductService,
    deleteProductService,
    updateProductService,
    createProductService,
    filterProductService
} = require('../service/productManagerService.js');

const createProduct = (req, res, next) => {
    console.log('creating product')
    const product = req.body
    const createdProductPromise = createProductService(product)
    createdProductPromise.then((createdProduct) => res.json({
        data: createdProduct
    })).catch((error) => next(error));
}
const getProduct = (req, res, next) => {
    const id = req.params.id
    console.log(`fetching product details for ${id}`)
    getProductService(id).then((product) => res.json({
        data: product
    })).catch((error) => next(error));
}
const updateProduct = (req, res) => {
    console.log('updateProduct')
    res.json({
        message: 'Product updated successfully'
    });
}
const filterProducts = (req, res) => {
    console.log('filterProducts')
    res.json({
        message: 'Products fetched successfully'
    });
}
module.exports = {
    filterProducts,
    updateProduct,
    getProduct,
    createProduct
}
