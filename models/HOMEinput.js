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
    console.log("HOMEinput連線成功");
});

const pose = new mongoose.Schema({
    acc:String,
    day: String,
    inputS: String,
});

pose.set('collection', 'HomePose');
const model = mongoose.model('HomePose', pose);

module.exports = model;