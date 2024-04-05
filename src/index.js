const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

const SortMiddleware = require('./app/middlewares/SortMiddleware')

const route = require('./routes');
const db = require('./config/db')

// Connect DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json()); // XMLHttpRequest, Fetch, Ajax...

app.use(methodOverride('_method'))

// Custom middlewares
app.use(SortMiddleware)

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
    helpers: {
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

            return `<a href="?_sort&column=${field}&type=${type} ">
                        <i class="${icon}"></i>  
                    </a>`
        }
    }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});