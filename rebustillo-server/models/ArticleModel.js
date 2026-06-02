const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    no: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    stack: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);
