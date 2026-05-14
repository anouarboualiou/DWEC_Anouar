const express = require('express');
const router = express.Router();

const db = require('../db/connection');
const isAuthenticated = require('../middleware/auth');


router.get('/dashboard', isAuthenticated, (req, res) => {

    const userId = req.session.user.id;

    const projectSql = `
        SELECT * FROM projects
        WHERE user_id = ?
    `;

    const socialSql = `
        SELECT * FROM social_links
        WHERE user_id = ?
    `;

    db.query(projectSql, [userId], (err, projects) => {

        if (err) {
            return res.send('Error proyectos');
        }

        db.query(socialSql, [userId], (err, socialLinks) => {

            if (err) {
                return res.send('Error social');
            }

            res.render('dashboard', {
                user: req.session.user,
                projects,
                socialLinks
            });

        });

    });

});


router.post('/projects/add', isAuthenticated, (req, res) => {

    const userId = req.session.user.id;

    const { title, description, repo_url, live_url } = req.body;

    const sql = `
        INSERT INTO projects
        (title, description, repo_url, live_url, user_id)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [title, description, repo_url, live_url, userId], (err) => {

        if (err) {
            console.log(err);
            return res.send('Error insert');
        }

        res.redirect('/dashboard');

    });

});

router.get('/projects/delete/:id', isAuthenticated, (req, res) => {

    const projectId = req.params.id;
    const userId = req.session.user.id;

    const sql = `
        DELETE FROM projects
        WHERE id = ? AND user_id = ?
    `;

    db.query(sql, [projectId, userId], (err) => {

        if (err) {
            console.log(err);
        }

        res.redirect('/dashboard');

    });

});

router.post('/social/add', isAuthenticated, (req, res) => {

    const userId = req.session.user.id;

    const { platform, url } = req.body;

    const sql = `
        INSERT INTO social_links
        (platform, url, user_id)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [platform, url, userId], (err) => {

        if (err) {
            console.log(err);
        }

        res.redirect('/dashboard');

    });

});

router.get('/social/delete/:id', isAuthenticated, (req, res) => {

    const linkId = req.params.id;
    const userId = req.session.user.id;

    const sql = `
        DELETE FROM social_links
        WHERE id = ? AND user_id = ?
    `;

    db.query(sql, [linkId, userId], () => {

        res.redirect('/dashboard');

    });

});

router.post('/profile/update', isAuthenticated, (req, res) => {

    const userId = req.session.user.id;

    const { bio, email, photo } = req.body;

    const sql = `
        UPDATE users
        SET bio = ?, email = ?, photo = ?
        WHERE id = ?
    `;

    db.query(sql, [bio, email, photo, userId], (err) => {

        if (err) {
            console.log(err);
            return res.send('Error update');
        }

        req.session.user.bio = bio;
        req.session.user.email = email;
        req.session.user.photo = photo;

        res.redirect('/dashboard');

    });

});

router.get('/projects/edit/:id', isAuthenticated, (req, res) => {

    const projectId = req.params.id;
    const userId = req.session.user.id;

    const sql = `
        SELECT * FROM projects
        WHERE id = ? AND user_id = ?
    `;

    db.query(sql, [projectId, userId], (err, results) => {

        if (results.length === 0) {
            return res.send('No autorizado');
        }

        res.render('edit-project', {
            project: results[0]
        });

    });

});

router.post('/projects/update/:id', isAuthenticated, (req, res) => {

    const projectId = req.params.id;
    const userId = req.session.user.id;

    const { title, description, repo_url, live_url } = req.body;

    const sql = `
        UPDATE projects
        SET
            title = ?,
            description = ?,
            repo_url = ?,
            live_url = ?
        WHERE id = ? AND user_id = ?
    `;

    db.query(sql, [
        title,
        description,
        repo_url,
        live_url,
        projectId,
        userId
    ], () => {

        res.redirect('/dashboard');

    });

});




module.exports = router