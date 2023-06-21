const createProduct = (req, res) => {
    console.log('createProduct')
    res.json({
        message: 'Product created successfully'
    })
}
const getProduct = (req, res) => {
    console.log('getProduct')
    res.json({
        message: 'Product fetched successfully'
    });
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
