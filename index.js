const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');
const connection = require('./database/database');


const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const usersController = require('./users/UsersController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User');

// view engine
app.set('view engine','ejs');

// Redis



// Sessions

app.use(session({
    secret: "qualquercoisa", cookie: { maxAge: 300000} // cookie que aponta para a sessão ativa no servidor
}))

// static
app.use(express.static('public'));

// routes
app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

// body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// Database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com sucesso');
    }).catch((error) => {
        console.log(error)
    })




app.get('/session', (req, res) => {
    req.session.treinamento = "Formação Node.js"
    req.session.ano = 2019
    req.session.email = "rafael@udemy.com"
    req.session.user = {
        username: 'rafael',
        email: "email@email.com",
        id: 10
    }
    res.send('Sessão gerada');
});

app.get('/leitura', (req, res) => {
    res.json({
        treinamento: req.session.treinamento,
        ano: req.session.ano,
        email: req.session.email,
        user: req.session.user
    })
});

app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ['id','DESC']
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        })
    })
});

app.get('/:slug', (req, res) => {
    var slug = req.params.slug;

    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", {articles: article, categories: categories});
            })
        } else {
            res.redirect('/');
        }
    }).catch( err => {
        res.redirect('/');
    })
});

app.get('/category/:slug', (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then( category => {
        if (category != undefined) {
            
            Category.findAll().then(categories => {
                res.render('index', {articles: category.articles, categories: categories});
            })

        } else {
            res.redirect('/');
        }
    }).catch( err => {
        res.redirect('/');
    })
});

app.listen(8080, () => {
    console.log("O servidor está rodando")
})