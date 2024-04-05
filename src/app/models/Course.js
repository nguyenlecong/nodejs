const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const courseSchema = new Schema({
    name: { type: String, require: true },
    image: { type: String },
    videoId: { type: String, require: true },
    description: { type: String, require: true },
    slug: { type: String, slug: 'name', unique: true },
    level: { type: String, require: true }
}, {
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

module.exports = mongoose.model('Course', courseSchema)