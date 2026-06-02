const Article = require('../models/ArticleModel');

const getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.json({ articles });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createArticle = async (req, res) => {
    try {
        const article = new Article(req.body);
        const savedArticle = await article.save();
        res.json(savedArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findByIdAndUpdate(id, req.body, { new: true });
        res.json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        await Article.findByIdAndDelete(id);
        res.json({ message: 'Article deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getArticles, createArticle, updateArticle, deleteArticle };