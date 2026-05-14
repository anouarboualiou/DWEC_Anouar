
const express = require('express')
const session = require('express-session')
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const portfolioRoutes = require('./routes/portfolio');

const app = express()

app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'portfolio-secret',
    resave: false,
    saveUninitialized: false
}));

app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', portfolioRoutes);

app.get('/', (req, res) => {

    res.render('home', {
        user: req.session.user
    });

});

app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log('Servidor iniciado');
});