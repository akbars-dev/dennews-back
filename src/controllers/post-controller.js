const postModel = require('../models/post-model');
const formatDate = require('../utils/format-util');
const fs = require('fs');
const path = require('path');


class PostController {
    async createPost(req, res) {
        const { title, subtitle, description, category } = req.body;
        const image = req.file.filename;
        const dateString = formatDate(new Date(Date.now())); // Convert current date to formatted string

        const newPost = await postModel.create({
            title,
            subtitle,
            description,
            category,
            image,
            date: dateString,
        });

        res.status(201).json({
            success: true,
            message: 'Post created',
            data: newPost
        })
    }

    async updatePost(req, res) {
        const post = await postModel.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        let updatedData = req.body;

        if (req.file) {
            updatedData.image = req.file.filename;
            const oldPhotoPath = await path.join(__dirname, '../', '../uploads', post.image);

            console.log(oldPhotoPath);

            if (fs.existsSync(oldPhotoPath)) {
                fs.unlinkSync(oldPhotoPath);
            }
        }

        const updatedPost = await postModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.status(200).json({
            success: true,
            message: 'Post updated',
            data: updatedPost
        });
    }


    async deletePost(req, res) {
        const post = await postModel.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        const photoPath = await path.join(__dirname, '../', '../uploads', post.image);
        if (fs.existsSync(photoPath)) {
            fs.unlinkSync(photoPath);
        }

        await postModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Post deleted'
        });
    }

    async getPosts(req, res) {
        const posts = await postModel.find().populate('category', 'name')
        res.status(200).json({
            success: true,
            message: 'Posts fetched',
            data: posts
        })
    }

    async getPost(req, res) {
        const post = await postModel.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Post fetched',
            data: post
        })
    }


    async getLast20Posts(req, res) {
        try {
            const posts = await postModel
                .find()
                .sort({ createdAt: -1 })
                .limit(20);

            res.status(200).json({
                success: true,
                message: 'Last 20 posts fetched',
                data: posts
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}


module.exports = new PostController();