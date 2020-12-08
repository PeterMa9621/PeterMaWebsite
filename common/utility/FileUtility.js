import fs from 'fs';

export default class FileUtility {
    static getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    static saveBase64ToFile(base64, path, filename){
        return new Promise((resolve, reject) => {
            let base64File = base64.split(';base64,').pop();
            if(!fs.existsSync(path))
                fs.mkdirSync(path);
            fs.writeFile(path + filename, base64File, {encoding: 'base64'}, function(err) {
                if(err === null)
                    resolve();
                else
                    reject(err);
            });
        });
    }

    static deleteFile(path) {
        try {
            fs.unlinkSync(path);
        } catch (e) {
            console.log(e);
        }
    }
}
