const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
    try {
        const products = [
            {
                name: 'T-Shirt',
                description: 'Comfortable and stylish t-shirt for everyday wear.',
                stock: 50,
                quantity: 1,
                price: 19,
                category: 'CLOTHING',
                status: 'ACTIVE',
            },
            {
                name: 'Running Shoes',
                description: 'Lightweight running shoes with excellent cushioning.',
                stock: 20,
                quantity: 3,
                price: 99,
                category: 'SHOES',
                status: 'ACTIVE',
            },
            {
                name: 'Handbag',
                description: 'Stylish and spacious handbag for carrying essentials.',
                stock: 10,
                quantity: 2,
                price: 79,
                category: 'ACCESSORIES',
                status: 'ACTIVE',
            },
            {
                name: 'Sofa',
                description: 'Comfortable sofa with modern design for your living room.',
                stock: 5,
                quantity: 1,
                price: 499,
                category: 'HOME',
                status: 'ACTIVE',
            },
            {
                name: 'Lipstick',
                description: 'Long-lasting and vibrant lipstick for a stunning look.',
                stock: 30,
                quantity: 1,
                price: 12,
                category: 'BEAUTY',
                status: 'ACTIVE',
            },
            {
                name: 'Smartphone',
                description: 'Feature-rich smartphone with high-resolution display.',
                stock: 15,
                quantity: 1,
                price: 899,
                category: 'ELECTRONICS',
                status: 'ACTIVE',
            },
            {
                name: 'Running Shorts',
                description: 'Breathable and lightweight shorts for running enthusiasts.',
                stock: 25,
                quantity: 2,
                price: 29,
                category: 'CLOTHING',
                status: 'ACTIVE',
            },
            {
                name: 'Wristwatch',
                description: 'Elegant wristwatch with a classic design for a sophisticated look.',
                stock: 8,
                quantity: 1,
                price: 149,
                category: 'ACCESSORIES',
                status: 'ACTIVE',
            },
            {
                name: 'Bed Sheets',
                description: 'Soft and comfortable bed sheets for a good night\'s sleep.',
                stock: 12,
                quantity: 1,
                price: 39,
                category: 'HOME',
                status: 'ACTIVE',
            },
            {
                name: 'Mascara',
                description: 'Lengthening and volumizing mascara for striking eyelashes.',
                stock: 40,
                quantity: 1,
                price: 15,
                category: 'BEAUTY',
                status: 'ACTIVE',
            }
        ];

        for (const product of products) {
            await prisma.product.create({ data: product });
        }

        console.log('Seeding completed successfully!');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
