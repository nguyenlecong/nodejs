const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const courseSchema = new Schema({
    _id: {type: Number },
    name: { type: String, require: true },
    image: { type: String },
    videoId: { type: String, require: true },
    description: { type: String, require: true },
    slug: { type: String, slug: 'name', unique: true },
    level: { type: String, require: true }
}, {
    _id: false,
    timestamps: true
});

// Custom query helpers
courseSchema.query.sorttable = function(req) {
    if (req.query.hasOwnProperty('_sort')) {
        return this.sort({
            [req.query.column]: req.query.type
        })
    }
    return this
}

// Add plugin
mongoose.plugin(slug)
courseSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true
})
courseSchema.plugin(AutoIncrement)

module.exports = mongoose.model('Course', courseSchema)