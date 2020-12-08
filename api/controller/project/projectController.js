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
    let project = req.body;

    let promises = saveContentImages(req, project);
    promises.push(saveCoverImage(req, project));

    Promise.all(promises).then(() => {
        let now = new Date();

        let projectObject = new Project({
            ...project,
            authorId: userId,
            createdDate: now,
            updatedDate: now,
            isRemoved: false
        });
        return projectObject.save();
    }).then(response => {
        res.status(201).send(response);
    }).catch(error => {
        res.status(400).send({msg: 'Create project failed, ' + error});
    });
};

exports.projectPatchController = async (req, res) => {
    let projectId = req.params.id;
    let project = req.body;
    await deleteImages(project);
    let promises = saveContentImages(req, project);

    let saveCoverImagePromise = saveCoverImage(req, project);
    promises.push(saveCoverImagePromise);

    Promise.all(promises).then(() => {
        return Project.findByIdAndUpdate(projectId, {...project});
    }).then(response => {
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

function deleteImages(project) {
    return new Promise((resolve, reject) => {
        if(!('coverImage' in project) || !('contentImages' in project)) {
            resolve();
            return;
        }
        let projectId = project._id;
        Project.findById(projectId).then(existedProject => {
            let coverImage = existedProject.coverImage;
            if(coverImage!==undefined && project.coverImage.url !== coverImage.url) {
                let fileName = coverImage.url.split('/').pop();
                FileUtility.deleteFile('static/upload/' + fileName);
            }

            for(let contentImage of existedProject.contentImages) {
                let hasFound = false;
                for(let newContentImage of project.contentImages) {
                    if(contentImage.url === newContentImage.url) {
                        hasFound = true;
                        break;
                    }
                }
                if(!hasFound) {
                    let fileName = contentImage.url.split('/').pop();
                    FileUtility.deleteFile('static/upload/' + fileName);
                }
            }

            resolve();
        }).catch(error => {
            reject(error);
        });
    });
}

function saveCoverImage(req, project) {
    if('coverImage' in project) {
        let coverImage = project.coverImage;
        if ('src' in coverImage) {
            let fileName = coverImage['id'] + '.' + coverImage['extension'];
            let coverImageUrl = req.protocol + '://' + req.get('host') + '/upload/' + fileName;
            let promise = FileUtility.saveBase64ToFile(coverImage['src'], 'static/upload/', fileName);
            delete project['coverImage'];
            project['coverImage'] = {
                url: coverImageUrl
            };
            return promise;
        }
    }
    return null;
}

function saveContentImages(req, project) {
    let promises = [];
    if('contentImages' in project) {
        for(let contentImage of project['contentImages']) {
            if(!('src' in contentImage))
                continue;
            let id = contentImage.id;
            let ext = contentImage.extension;
            let fileName = id + '.' + ext;
            promises.push(FileUtility.saveBase64ToFile(contentImage['src'], 'static/upload/', fileName));
            let oldUrl = contentImage['url'];
            let newUrl = req.protocol + '://' + req.get('host') + '/upload/' + fileName;

            contentImage['url'] = newUrl;
            convertContentImageUrl(project, oldUrl, newUrl);
            delete contentImage['id'];
            delete contentImage['src'];
            delete contentImage['extension'];
        }
    }
    return promises;
}


function convertContentImageUrl(project, targetUrl, newUrl) {
    if(targetUrl.startsWith('blob:')) {
        let content = project.content;
        project.content = content.replace(new RegExp(targetUrl, 'g'), newUrl);
    }
}
