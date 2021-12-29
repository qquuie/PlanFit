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
    console.log("MongoDB連線成功");
});

const loginSchema = new mongoose.Schema({
    acc:String,
    pw:String,
    status:Boolean
});
loginSchema.set('collection', 'list');
const model = mongoose.model('list', loginSchema);

module.exports = model;