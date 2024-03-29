const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
    name: { type: String, require: true },
    image: { type: String },
    videoId: { type: String, require: true },
    description: { type: String, require: true },
    slug: { type: String, slug: 'name', unique: true},
    level: { type: String, require: true}
}, {
    timestamps : true
});

// Add plugin
mongoose.plugin(slug)
Course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
})

module.exports = mongoose.model('Course', Course)