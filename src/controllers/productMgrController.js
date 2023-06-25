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
    createdProductPromise.then((createdProduct) => {
        res.locals = createdProduct;
        next(req, res);
    }).catch((error) => next(error));
}
const getProduct = (req, res, next) => {
    const id = req.params.id
    console.log(`fetching product details for ${id}`)
    getProductService(id).then((product) => {
        res.locals = product;
        next(req, res)
    }).catch((error) => next(error));
}
const updateProduct = (req, res) => {
    console.log('updateProduct')
    res.json({
        message: 'Product updated successfully'
    });
}
const filterProducts = (req, res, next) => {
    console.log('filter products')
    filterProductService(req.body, req.params.cursor, req.params.pageSize)
        .then((products) => {
            if (products.length == 0) {
                res.locals = {
                    products: [],
                    hasNextPage: false
                }
            }
            else {
                const lastProdId = products[products.length - 1].cursor
                res.locals = {
                    products: products,
                    cursor: lastProdId,
                    hasNextPage: products.length < req.params.pageSize
                }
            }
            next(req, res)
        })
        .catch((error) => next(error));
}
module.exports = {
    filterProducts,
    updateProduct,
    getProduct,
    createProduct
}
