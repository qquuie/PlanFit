const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/final";

//-----sync syntax-----
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("folder連線成功");
});

const folderSchema = new mongoose.Schema({
    id: String,
    title: String,
    status: Boolean
});
folderSchema.set('collection', 'folder');
const model = mongoose.model('folder', folderSchema);

module.exports = model;