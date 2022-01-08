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
    console.log("cal連線成功");
});

const calendarSchema = new mongoose.Schema({
    acc: String,
    // day:Array,
    day:String,
    title:String,
    times:String,
    times_status:String
    //Number
});
calendarSchema.set('collection', 'calendar');//後者為資料庫的資料夾名稱
const model = mongoose.model('calendar', calendarSchema);

module.exports = model;