const { getProductService, deleteProductService, updateProductService,
    createProductService, filterProductService } = require('../service/productManagerService.js');

const { addJob } = require('../job/productCreationJob.js');

const createProduct = (req, res, next) => {
    console.log('creating product')
    const product = req.body
    const createdProductPromise = createProductService(product)
    createdProductPromise.then((createdProduct) => {
        res.locals = createdProduct;
        next()
    }).catch((error) => next(error));
}

const getProduct = (req, res, next) => {
    const id = parseInt(req.params.id)
    console.log(`fetching product details for ${id}`)
    getProductService(id).then((product) => {
        console.log(product)
        res.locals = product;
        next()
    }).catch((error) => next(error));
}

const deleteProduct = (req, res, next) => {
    const id = parseInt(req.params.id)
    deleteProductService(id).then((product) => {
        res.locals = product;
        next()
    }).catch((error) => next(error));
}

const updateProduct = (req, res) => {
    const id = parseInt(req.params.id)
    console.log(`fetching product details for ${id}`)
    updateProductService(req.body, id).then((product) => {
        res.locals = product;
        next()
    }).catch((error) => next(error));
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
            next()
        })
        .catch((error) => next(error));
}

const bulkUpload = (req, res, next) => {
    addJob({ products: req.body })
        .then(() => {
            res.locals = "Job has been queued successfully"
            next()
        })
        .error((error) => next(error))

}
module.exports = { filterProducts, updateProduct, getProduct, createProduct, bulkUpload, deleteProduct }
