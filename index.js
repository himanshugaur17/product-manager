/**
 * The api should be able to perform CRUD operations using prisma orm on an sql database of your choice (locally run via docker). The entity on which CRUD operations should be performed is Product. Attributes of product are:
Name
Description
Stock (non negative integer)
Quantity (non negative integer)
Category (clothing/shoes/accessories/home/beauty)

Using the API, you should be able to
create a product,
update any attribute of the product,
get a list products’ names based on name, quantity, stock or category (filters should be options and can be in any combination) and also support pagination,
get a single product information based on name and some unique ID
You should also be able to make a product activ
 */
const express= require('express');
