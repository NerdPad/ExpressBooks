var express = require('express');

var routes = function (Book) {
    var router = express.Router();

    router.route('/')
        .post(function (req, res) {
            var book = new Book(req.body);
            book.save();

            res.status(201).send(book);
        })
        .get(function (req, res) {
            var query = us.pick(req.query, 'genre', 'author', 'read');

            Book.find(query, function (err, books) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }

                res.json(books);
            });
        });

    router.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
                return;
            }

            if (!book) {
                res.status(404).send('no book found');
                return;
            }

            req.book = book;
            next();
        });
    });

    router.route('/:bookId')
        .get(function (req, res) {
            res.json(req.book);
        })
        .put(function (req, res) {

                req.book.title = req.body.title;
                req.book.author = req.body.author;
                req.book.genre = req.body.genre;
                req.book.read = req.body.read;
                req.book.save();

                res.json(req.book);
        })
        .patch(function (req, res) {

        });

    return router;
};

module.exports = routes;