const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    content: String,
    coverImageUrl: String,
    authorId: mongoose.ObjectId,
    createdDate: Date,
    updatedDate: Date,
    isRemoved: Boolean
});

module.exports = mongoose.model('Project', projectSchema);

