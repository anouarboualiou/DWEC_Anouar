const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs/access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
  const render = res.render.bind(res);

  res.render = (view, options = {}, callback) => {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    render(view, options, (err, html) => {
      if (err) {
        return callback ? callback(err) : next(err);
      }

      if (view === 'layout' || options.layout === false) {
        return callback ? callback(null, html) : res.send(html);
      }

      render('layout', { ...options, body: html }, (layoutErr, layoutHtml) => {
        if (layoutErr) {
          return callback ? callback(layoutErr) : next(layoutErr);
        }

        return callback ? callback(null, layoutHtml) : res.send(layoutHtml);
      });
    });
  };

  next();
});

app.use('/', require('./routes/libros.routes'));
app.use('/prestamo', require('./routes/prestamos.routes'));

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
