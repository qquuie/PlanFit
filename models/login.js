const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/final";
var bcrypt = require('bcryptjs');

//-----sync syntax-----
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("login連線成功");
});

const loginSchema = new mongoose.Schema({
    acc: {
        type: String,
        require: true
    },
    pw: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    birth: String,
    sex: {
        type: String,
        require:true
    },
    focusOption: {
        type: String,
        require:true
    },
    needOption: {
        type: String,
        require:true
    },
    height: Number,
    weight: Number,
    age: Number,
    status: Boolean
});

loginSchema.set('collection', 'list');
const model = mongoose.model('list', loginSchema);


module.exports = model;