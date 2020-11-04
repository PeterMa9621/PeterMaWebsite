import authUtility from "../../common/utility/authUtility";
import FileUtility from "../../../common/utility/FileUtility";
import {v4 as uuidv4} from 'uuid';
const Project = require('../../model/project/projectModel');

exports.projectGetAllController = (req, res) => {
    Project.find({isRemoved: false}).then(response => {
        res.status(200).send(response);
    }).catch(reason => {
        res.status(400).send({msg: reason});
    });
};

exports.projectGetController = (req, res) => {
    let projectId = req.params.id;
    Project.findById(projectId).then(response => {
        res.status(200).send(response);
    }).catch(reason => {
        res.status(400).send({msg: reason});
    });
};

exports.projectPostController = (req, res) => {
    let authInfo = authUtility.getAuthInfo(req);
    let userId = authInfo[2];
    let data = req.body;
    let coverImageNameExtension = data['coverImageName'].split('.').pop();
    let coverImageName = uuidv4() + '.' + coverImageNameExtension;
    FileUtility.saveBase64ToFile(data['coverImage'], 'static/upload/', coverImageName).then(() => {
        delete data['coverImage'];
        delete data['coverImageName'];
        let now = new Date();
        let project = new Project({
            ...data,
            authorId: userId,
            createdDate: now,
            updatedDate: now,
            coverImageUrl: req.protocol + '://' + req.get('host') + '/upload/' + coverImageName,
            isRemoved: false
        });
        return project.save();
    }).then(response => {
        res.status(201).send(response);
    }).catch(error => {
        res.status(400).send({msg: error});
    });
};

exports.projectPatchController = (req, res) => {
    let projectId = req.params.id;
    Project.findByIdAndUpdate(projectId, {...req.body}).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(400).send({msg: err});
    });
};

exports.projectDeleteController = (req, res) => {
    let projectId = req.params.id;
    Project.findByIdAndRemove(projectId).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(400).send({msg: err});
    });
};
