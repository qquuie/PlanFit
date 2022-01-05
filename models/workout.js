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
    console.log("workout連線成功");
});

const pose = new mongoose.Schema({
    name: String,
    level: String,
    equipment: Boolean,
    Jumping: Boolean,
    img: String,
    click: Number,
    describe: String,
    class_pose: String, //關於屬於哪個部位
    status: Boolean,
    need: Array,
    num: Number
});

pose.set('collection', 'pose');
const model = mongoose.model('pose', pose);

module.exports = model;