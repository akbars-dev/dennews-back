const {Router} = require('express');
const categoryController = require('../controllers/category-controller');
const categoryApi = Router();

categoryApi.get('/all', categoryController.getCategories);
categoryApi.get('/:id', categoryController.getCategory);
categoryApi.post('/create/', categoryController.createCategory);
categoryApi.put('/update/:id', categoryController.updateCategory);
categoryApi.delete('/delete/:id', categoryController.deleteCategory);

module.exports = categoryApi;
