const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getProduct = (id) => {

}
const filterProducts = (filterCriteria) => {
    if (filterCriteria.nameLike) {
        let filteredProducts = prisma.product.findMany({
            where: {
                name: {
                    contains: filterCriteria.nameLike
                }
            }
        });
        return filteredProducts;
    }
    else if (filterCriteria.descriptionLike) {
        return prisma.product.findMany({
            where: {
                description: {
                    contains: filterCriteria.descriptionLike
                }
            }
        })
    }
    let prismaFilterCrtiteria = {
        ...(filterCriteria.name && { name: filterCriteria.name }),
        ...(filterCriteria.stock && { stock: filterCriteria.stock }),
        ...(filterCriteria.quantity && { quantity: filterCriteria.quantity }),
        ...(filterCriteria.status && { status: filterCriteria.status }),
        ...(filterCriteria.description && { description: filterCriteria.description }),
        ...(filterCriteria.category && { category: filterCriteria.category })
    }
    return prisma.product.findMany({
        where: prismaFilterCrtiteria
    })
}
const updateProduct = (updateRequest, id) => {
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
const createProduct = async (product) => {
    let name = product.name;
    existingProduct = prisma.product.findFirst({
        name: name
    })
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
const deleteProduct = (id) => {

}
function inputProductValid(product) {
    return product.price > 0 && product.stock >= 0 && product.quantity >= 0
}