const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    content: String,
    coverImage: Object,
    authorId: mongoose.ObjectId,
    createdDate: Date,
    updatedDate: Date,
    isRemoved: Boolean,
    summary: String,
    contentImages: Array
});

module.exports = mongoose.model('Project', projectSchema);

