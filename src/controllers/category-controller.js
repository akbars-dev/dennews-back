const categoryModel = require('../models/category-model');
const postModel = require('../models/post-model');

class CategoryController {
    async createCategory(req, res) {
        const condidate = await categoryModel.findOne({ name: req.body.name })
        if (condidate) {
            return res.status(400).json({
                success: false,
                message: 'Category already exists'
            })
        }

        const category = await categoryModel.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Category created',
            data: category
        })
    }

    async getCategories(req, res) {
        const categories = await categoryModel.find();
        res.status(200).json({
            success: true,
            message: 'Categories fetched',
            data: categories
        })
    }



    async updateCategory(req, res) {
        const category = await categoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            })
        }

        const updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            message: 'Category updated',
            data: updatedCategory
        })
    }

    async deleteCategory(req, res) {
        const category = await categoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            })
        }
        await categoryModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Category deleted'
        })
    }

    async getCategory(req, res) {
        const category = await categoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            })
        }

        const posts = await postModel.aggregate([
            {
                $match: {
                    _id: category._id
                }
            },
            {
                $lookup: {
                    from: 'posts',
                    localField: '_id',
                    foreignField: 'category',
                    as: 'posts'
                }
            }
        ])

        return res.status(200).json({
            success: true,
            message: 'Category fetched',
            data: { category, posts }
        })
    }
}


module.exports = new CategoryController();