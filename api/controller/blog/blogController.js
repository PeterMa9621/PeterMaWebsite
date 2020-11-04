import authUtility from "../../common/utility/authUtility";

const Blog = require('../../model/blog/blogModel');

exports.blogGetAllController = (req, res) => {
    Blog.find({isRemoved: false}).then(response => {
        res.status(200).send(response);
    }).catch(reason => {
        res.status(400).send({msg: reason});
    });
};

exports.blogGetController = (req, res) => {
    let blogId = req.params.id;
    Blog.findById(blogId).then(response => {
        res.status(200).send(response);
    }).catch(reason => {
        res.status(400).send({msg: reason});
    });
};

exports.blogPostController = (req, res) => {
    let authInfo = authUtility.getAuthInfo(req);
    let userId = authInfo[2];
    let data = req.body;

    let blog = new Blog({
        ...data,
        authorId: userId,
        createdDate: new Date(),
        isRemoved: false
    });
    blog.save().then(response => {
        res.status(201).send(response);
    }).catch(err => {
        res.status(400).send({msg: err});
    });
};

exports.blogPatchController = (req, res) => {
    let blogId = req.params.id;
    Blog.findByIdAndUpdate(blogId, {...req.body}).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(400).send({msg: err});
    });
};

exports.blogDeleteController = (req, res) => {
    let blogId = req.params.id;
    Blog.findByIdAndRemove(blogId).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(400).send({msg: err});
    });
};
