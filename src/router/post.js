const {Router} = require('express');
const postApi = Router();

postApi.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'success'
    })
})


module.exports = postApi
