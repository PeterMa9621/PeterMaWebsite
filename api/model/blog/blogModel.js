const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    labels: Array,
    authorId: mongoose.ObjectId,
    createdDate: Date,
    isRemoved: Boolean
});

module.exports = mongoose.model('Blog', blogSchema);
