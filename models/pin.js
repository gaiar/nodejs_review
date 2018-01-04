const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/we2');

const PinSchema = new Schema({
    timestamp: {type: String, createdAt: 'timestamp'},
    title: {type: String, required: true},
    type: {type: String, enum: ['image', 'video', 'website'], required: true},
    src: {type: String, required: true},
    description: {type: String, default: ""},
    views: {type: Number, min: 0, default: 0},
    ranking: {type: Number, min: 0, default: 0}
})


const PinModel = mongoose.model("Pin", {message: String});