import axios from "axios";
import Setting from "../../common/setting/Setting";
import URLUtility from "../../common/utility/URLUtility";

export default class ProjectService {
    static getProjects() {
        return new Promise((resolve, reject) => {
            axios.get(Setting.projectApiUrl).then(response => {
                resolve(response.data);
            }).catch(reason => {
                reject(reason);
            });
        });
    }

    static getProject(id) {
        return new Promise((resolve, reject) => {
            axios.get(Setting.projectApiUrl + id).then(response => {
                resolve(response.data);
            }).catch(reason => {
                reject(reason);
            });
        });
    }

    static createProject(project) {
        return new Promise((resolve, reject) => {
            axios.post(Setting.projectApiUrl, project, URLUtility.getAuthHeaders()).then(response => {
                resolve(response.data);
            }).catch(reason => {
                reject(reason);
            });
        });
    }

    static deleteProject(projectId) {
        return new Promise((resolve, reject) => {
            axios.patch(Setting.projectApiUrl + projectId, {
                isRemoved: true
            }, URLUtility.getAuthHeaders()).then(response => {
                resolve(response.data);
            }).catch(reason => {
                reject(reason);
            });
        });
    }

    static editProject(projectId, project) {
        return new Promise((resolve, reject) => {
            axios.patch(Setting.projectApiUrl + projectId, project, URLUtility.getAuthHeaders()).then(response => {
                resolve(response.data);
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}
