const Article = require('../models/ArticleModel');

const getUsers = async (req, res) => {
    try {
        const articles = await Article.find();
        res.json({ articles });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const article = new Article(req.body);
        const savedArticle = await article.save();
        res.json(savedArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findByIdAndUpdate(id, req.body, { new: true });
        res.json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await Article.findByIdAndDelete(id);
        res.json({ message: 'Article deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };