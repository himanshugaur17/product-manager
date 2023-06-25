const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getProductService = (id) => {
    return prisma.product.findUnique({
        where: {
            id: id
        }
    })
}

const filterProductService = (filterCriteria, cursor, pageSize) => {
    const cursorCriteria = {
        take: pageSize,
        ...(cursor && { cursor: cursor, skip: 1 }), /* If cursor specified then it will fetch based on the cursor */
        orderBy: {
            id: 'asc'
        }
    }
    /* Functionality for regex based search by product name */
    if (filterCriteria.nameLike) {
        let filteredProducts = prisma.product.findMany({
            where: {
                name: {
                    contains: filterCriteria.nameLike
                }
            },
            ...cursorCriteria
        });
        return filteredProducts;
    }
    /* Functionality for regex based search by product description */
    else if (filterCriteria.descriptionLike) {
        return prisma.product.findMany({
            where: {
                description: {
                    contains: filterCriteria.descriptionLike
                }
            },
            ...cursorCriteria
        })
    }
    else {
        return prisma.product.findMany({
            where: getPrismaFilterCriteria(filterCriteria),
            ...cursorCriteria
        })
    }
}

const updateProductService = (updateRequest, id) => {
    let proposedProduct = {
        ...(updateRequest.name && { name: updateRequest.name }),
        ...(updateRequest.stock && { stock: updateRequest.stock }),
        ...(updateRequest.quantity && { quantity: updateRequest.quantity }),
        ...(updateRequest.status && { status: updateRequest.status }),
        ...(updateRequest.description && { description: updateRequest.description }),
        ...(updateRequest.category && { category: updateRequest.category })
    }
    const updatedProduct = prisma.product.update({
        where: {
            id: id
        },
        data: proposedProduct
    })
}

const createProductService = async (product) => {
    let name = product.name;
    existingProduct = await prisma.product.findFirst({
        where: {
            name: name
        }
    })
    console.log(existingProduct)
    if (existingProduct) {
        console.error(`Product with name ${name} already exists`)
        return product;
    }
    else {
        if (!inputProductValid(product)) {
            console.error(`Invalid product input`)
            return product;
        }
        const newProduct = await prisma.product.create({
            data: {
                name: name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                category: product.category,
                quantity: product.quantity,
                status: product.status
            }
        })
        return newProduct;
    }
}

const deleteProductService = (id) => {
    return prisma.product.delete({
        where: {
            id: id
        }
    })
}

const bulkUploadService = async (job) => {
    const productsToCreate = job.products
    await prisma.product.createMany({
        data: productsToCreate
    })
}

function inputProductValid(product) {
    return product.price > 0 && product.stock >= 0 && product.quantity >= 0
}
function getPrismaFilterCriteria(filterCriteria) {
    return {
        ...(filterCriteria.name && { name: filterCriteria.name }),
        ...(filterCriteria.stock && { stock: filterCriteria.stock }),
        ...(filterCriteria.quantity && { quantity: filterCriteria.quantity }),
        ...(filterCriteria.status && { status: filterCriteria.status }),
        ...(filterCriteria.description && { description: filterCriteria.description }),
        ...(filterCriteria.category && { category: filterCriteria.category })
    }
}
module.exports = {
    getProductService, deleteProductService, updateProductService, createProductService, filterProductService, bulkUploadService
}