const { body } = require('express-validator')
const productBodyValidator = [body('stock').isNumeric().withMessage('Stock must be non-negative')
    , body('status').isIn(['ACTIVE', 'INACTIVE']).withMessage('Status must be ACTIVE or INACTIVE'),
body('category').isIn(['CLOTHING', 'ACCESSORIES', 'ELECTRONICS', 'BEAUTY', 'HOME', 'SHOES']).withMessage('category must be CLOTHING', 'ACCESSORIES', 'ELECTRONICS', 'BEAUTY', 'HOME', 'SHOES'),
body('price').isNumeric().withMessage('Price must be a number')]
module.exports = productBodyValidator
