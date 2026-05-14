
const express = require('express')
const router = express.Router()
const db = require('../db/connection')
const md5 = require('md5')

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {

    const {username, email, password} = req.body
    const encryptedPassword = md5(password)

    const sql = `
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?);
    `
    db.query(sql, [username, email, encryptedPassword], (err, result) => {

        if (err) {
            console.log(err)
            return res.send('Error registro')
        }

        res.redirect('/login')
    })
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', (req, res) => {

    const { username, password } = req.body;
    const encryptedPassword = md5(password);

    const sql =`
        SELECT * FROM users 
        WHERE username = ? AND password = ?;
    `

    db.query(sql, [username, encryptedPassword], (err, results) => {

        if(err){

            console.log(err);
            return res.send('Error');
        }

        if (results.length === 0) {
            return res.send('Usuario incorrecto');
        }

        req.session.user = results[0];

        res.redirect('/dashboard');

    })

})

router.get('/logout', (req, res) => {

    req.session.destroy(() => {
        res.redirect('/login');
    });

});


module.exports = router