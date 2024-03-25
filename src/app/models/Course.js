const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
    name: { type: String, maxLength: 255 },
    image: {},
    description: { type: String, maxLength: 500 },
    createAt: { type: Date, default: Date.now },
    slug: { type: String, maxlength: 100 },
});

module.exports = mongoose.model('Course', Course)