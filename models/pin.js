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
});

var model = mongoose.model("Pin", PinSchema);
// model.collection.insert([
//     {
//         title: '',
//         type: 'image',
//         src: '/res/pictures/1.jpg',
//     },    {
//         title: '',
//         type: 'image',
//         src: '/res/pictures/2.jpg',
//     },    {
//         title: '',
//         type: 'image',
//         src: '/res/pictures/2_trans.jpg',
//     },    {
//         title: '',
//         type: 'image',
//         src: '/res/pictures/4.jpg',
//     },    {
//         title: '',
//         type: 'image',
//         src: '/res/pictures/5.jpg',
//     },    {
//         title: '',
//         type: 'image',
//         src: '/res/pictures/6.jpg',
//     },    {
//         title: '',
//         type: 'image',
//         src: '/res/pictures/7.jpg',
//     },    {
//         title: '',
//         type: 'image',
//         src: '/res/pictures/8.jpg',
//     },    {
//         title: '',
//         type: 'image',
//         src: '/res/pictures/9.jpg',
//     },    {
//         title: '',
//         type: 'image',
//         src: '/res/pictures/10.jpg',
//     },    {
//         title: '',
//         type: 'image',
//         src: '/res/pictures/11.jpg',
//     },    {
//         title: '',
//         type: 'image',
//         src: '/res/pictures/12.jpg',
//     },    {
//         title: '',
//         type: 'image',
//         src: '/res/pictures/13.jpg',
//     },
// ]);

module.exports = model;