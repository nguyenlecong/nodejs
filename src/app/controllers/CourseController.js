const Course = require('../models/Course')

class SiteController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .lean()
            .then(course => {
                res.render('courses/show', { course })
            })
            .catch(next)
    }
}

module.exports = new SiteController();