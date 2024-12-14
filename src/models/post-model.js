const { model, Schema } = require('mongoose');


const postSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'category', required: true },
}, { timestamps: true })


module.exports = model('post', postSchema);