module.exports = function sortMiddleware(req, res, next) {
    res.locals._sort = {
        enable: false,
        type: 'default'
    }
    
    if (req.query.hasOwnProperty('_sort')) {
        const currentType = req.query.type
        const isValidType = ['asc', 'desc'].includes(currentType)
        req.query.type = isValidType ? currentType : 'desc'

        // res.locals._sort.enable = true
        // res.locals._sort.type = req.query.type 
        // res.locals._sort.column = req.query.column 

        Object.assign(res.locals._sort, {
            enable: true,
            type: req.query.type,
            column: req.query.column 
        })
    }

    next()
}