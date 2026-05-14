const express = require('express');
const router = express.Router();

const db = require('../db/connection');

router.get('/portfolios', (req, res) => {

    const sql = `
        SELECT id, username, bio, photo
        FROM users
    `;

    db.query(sql, (err, users) => {

        if (err) {
            return res.send('Error DB');
        }

        res.render('portfolios', {
            users
        });

    });

});

router.get('/portfolio/:username', (req, res) => {

    const username = req.params.username;

    const userSql = `
        SELECT * FROM users
        WHERE username = ?
    `;

    db.query(userSql, [username], (err, users) => {

        if (err) {
            return res.send('Error DB');
        }

        if (users.length === 0) {
            return res.send('Usuario no encontrado');
        }

        const user = users[0];

        const projectsSql = `
            SELECT * FROM projects
            WHERE user_id = ?
        `;

        const socialSql = `
            SELECT * FROM social_links
            WHERE user_id = ?
        `;

        db.query(projectsSql, [user.id], (err, projects) => {

            db.query(socialSql, [user.id], (err, socialLinks) => {

                res.render('portfolio', {
                    user,
                    projects,
                    socialLinks
                });

            });

        });

    });

});

module.exports = router;