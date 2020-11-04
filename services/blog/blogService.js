import axios from "axios";
import Setting from "../../common/setting/Setting";
import ValidateUtility from "../../common/utility/ValidateUtility";
import URLUtility from "../../common/utility/URLUtility";

export default class BlogService {
    static getBlogs() {
        return new Promise((resolve, reject) => {
            axios.get(Setting.blogApiUrl).then(response => {
                resolve(response.data);
            }).catch(reason => {
                reject(reason);
            });
        });
    }

    static getBlog(id) {
        return new Promise((resolve, reject) => {
            axios.get(Setting.blogApiUrl + id).then(response => {
                resolve(response.data);
            }).catch(reason => {
                reject(reason);
            });
        });
    }

    static createBlog(blog) {
        return new Promise((resolve, reject) => {
            axios.post(Setting.blogApiUrl, blog, URLUtility.getAuthHeaders()).then(response => {
                resolve(response.data);
            }).catch(reason => {
                reject(reason);
            });
        });
    }

    static deleteBlog(blogId) {
        return new Promise((resolve, reject) => {
            axios.patch(Setting.blogApiUrl + blogId, {
                isRemoved: true
            }, URLUtility.getAuthHeaders()).then(response => {
                resolve(response.data);
            }).catch(reason => {
                reject(reason);
            });
        });
    }

    static updateBlog(blogId, blog) {
        return new Promise((resolve, reject) => {
            axios.patch(Setting.blogApiUrl + blogId, blog, URLUtility.getAuthHeaders()).then(response => {
                resolve(response.data);
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}
