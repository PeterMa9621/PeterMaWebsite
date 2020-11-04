const mongoose = require('mongoose');

export default class Database {
    static init() {
        mongoose.connect('mongodb+srv://mjy:mjy159357@cluster0.8ccow.mongodb.net/peterma?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        mongoose.connection.on('error', () => {
            console.log("Error while connecting mongodb!");
        });
        mongoose.connection.once('open', () => {
            console.log("Connected to mongodb!");
        });
    }
}
