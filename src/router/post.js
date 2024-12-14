const {Router} = require('express');
const postApi = Router();
const postController = require('../controllers/post-controller');
const upload = require('../utils/multer-util');

postApi.get('/all', postController.getPosts);
postApi.get('/last20', postController.getLast20Posts);
postApi.get('/:id', postController.getPost);
postApi.post('/create/', upload.single('image'), postController.createPost);
postApi.put('/update/:id', upload.single('image'), postController.updatePost);
postApi.delete('/delete/:id', postController.deletePost);

module.exports = postApi
