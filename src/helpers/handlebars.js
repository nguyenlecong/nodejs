const Handlebars = require('handlebars')

module.exports = {
    sum: (a, b) => a+b,
    sorttable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default'

        const icons = {
            default: 'fa-solid fa-sort',
            asc: 'fa-solid fa-sort-up',
            desc: 'fa-solid fa-sort-down'
        }
        const icon = icons[sortType]

        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc'
        }
        const type = types[sortType]

        const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)

        const result = `<a href="${href}">
                        <span class="${icon}"></span>  
                    </a>`

        return new Handlebars.SafeString(result)
    }
}