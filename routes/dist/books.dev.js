"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var router = express.Router();

var Sequelize = require('sequelize');

var Book = require('../models').Book;
/* Handler function to wrap each route. */


function asyncHandler(cb) {
  return function _callee(req, res, next) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(cb(req, res, next));

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            res.status(500).send(_context.t0);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 5]]);
  };
}
/* GET books listing. */


router.get('/', asyncHandler(function _callee2(req, res) {
  var page, limit, startIndex, endIndex, books, pageCount, arrayCount, i, bookss;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          page = req.query.page;
          limit = req.query.limit;
          startIndex = (page - 1) * limit;
          endIndex = page * limit;
          _context2.next = 6;
          return regeneratorRuntime.awrap(Book.findAll());

        case 6:
          books = _context2.sent;
          pageCount = books.length / limit;
          arrayCount = [];

          for (i = 0; i < pageCount; i++) {
            arrayCount.push(i);
          }

          _context2.next = 12;
          return regeneratorRuntime.awrap(Book.findAll({
            offset: startIndex || 0,
            limit: limit || 50,
            order: [['createdAt', 'DESC']]
          }));

        case 12:
          bookss = _context2.sent;
          res.render("books/index", {
            bookss: bookss,
            title: "moukim's library!",
            page: page,
            limit: limit,
            arrayCount: arrayCount
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
}));
/* Create a new book form. */

router.get('/new', function (req, res) {
  res.render("books/new-book", {
    book: {},
    title: "New book"
  });
});
/* POST create book. */

router.post('/', asyncHandler(function _callee3(req, res) {
  var book;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Book.create(req.body));

        case 3:
          book = _context3.sent;
          res.redirect("/books/" + book.id);
          _context3.next = 17;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);

          if (!(_context3.t0.name === "SequelizeValidationError")) {
            _context3.next = 16;
            break;
          }

          _context3.next = 12;
          return regeneratorRuntime.awrap(Book.build(req.body));

        case 12:
          book = _context3.sent;
          res.render("books/new-book", {
            book: book,
            errors: _context3.t0.errors,
            title: "New book"
          });
          _context3.next = 17;
          break;

        case 16:
          throw _context3.t0;

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}));
/* Edit book form. */

router.get("/:id/edit", asyncHandler(function _callee4(req, res) {
  var book;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Book.findByPk(req.params.id));

        case 2:
          book = _context4.sent;

          if (book) {
            res.render("books/update-book", {
              book: book,
              title: "Edit book"
            });
          } else {
            res.render('notFoundError');
          }

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}));
/* GET individual book. */

router.get('/:id', asyncHandler(function _callee5(req, res) {
  var book;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Book.findByPk(req.params.id));

        case 2:
          book = _context5.sent;

          if (book) {
            res.render("books/show", {
              book: book,
              title: book.title
            });
          } else {
            res.render('notFoundError');
          }

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}));
/* Update a book. */

router.post('/:id/edit', asyncHandler(function _callee6(req, res) {
  var book;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Book.findByPk(req.params.id));

        case 3:
          book = _context6.sent;

          if (!book) {
            _context6.next = 10;
            break;
          }

          _context6.next = 7;
          return regeneratorRuntime.awrap(book.update(req.body));

        case 7:
          res.redirect("/books/" + book.id);
          _context6.next = 11;
          break;

        case 10:
          res.render('notFoundError');

        case 11:
          _context6.next = 24;
          break;

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](0);

          if (!(_context6.t0.name === "SequelizeValidationError")) {
            _context6.next = 23;
            break;
          }

          _context6.next = 18;
          return regeneratorRuntime.awrap(Book.build(req.body));

        case 18:
          book = _context6.sent;
          book.id = req.params.id; // make sure correct book gets updated

          res.render("books/update-book", {
            book: book,
            errors: _context6.t0.errors,
            title: "Edit book"
          });
          _context6.next = 24;
          break;

        case 23:
          throw _context6.t0;

        case 24:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 13]]);
}));
/* Delete book form. */

router.get("/:id/delete", asyncHandler(function _callee7(req, res) {
  var book;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Book.findByPk(req.params.id));

        case 2:
          book = _context7.sent;

          if (book) {
            res.render("books/delete", {
              book: book,
              title: "Delete book"
            });
          } else {
            res.render('notFoundError');
          }

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
}));
router.post("/search", asyncHandler(function _callee8(req, res) {
  var query, path, Op, page, limit, startIndex, endIndex, bookss, pageCount, arrayCount, i, arrayCounts;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          res.redirect("/books/search/?page=1&limit=5");
          query = req.body.query;
          path = req.path;
          Op = Sequelize.Op;
          page = req.query.page;
          limit = req.query.limit;
          startIndex = (page - 1) * limit;
          endIndex = page * limit;
          console.log("1 : " + req.body.query);
          console.log("2 : " + req.query.page);
          console.log("3 " + req);
          _context8.next = 13;
          return regeneratorRuntime.awrap(Book.findAll({
            where: _defineProperty({}, Op.or, {
              title: _defineProperty({}, Op.like, '%' + query + '%'),
              author: _defineProperty({}, Op.like, '%' + query + '%'),
              genre: _defineProperty({}, Op.like, '%' + query + '%'),
              year: _defineProperty({}, Op.like, '%' + query + '%')
            }),
            offset: startIndex || 0,
            limit: limit || 50,
            order: [['createdAt', 'DESC']]
          }));

        case 13:
          bookss = _context8.sent;
          pageCount = bookss.length / limit;
          arrayCount = [];

          if (!path.includes('search')) {
            _context8.next = 32;
            break;
          }

          if (!(bookss.length > 0)) {
            _context8.next = 24;
            break;
          }

          for (i = 0; i < pageCount; i++) {
            arrayCount.push(i);
          }

          console.log("sayeb zebi ya khra");
          console.log(pageCount);
          res.render("books/index", {
            bookss: bookss,
            title: "moukim's library!",
            page: page,
            limit: limit,
            arrayCount: arrayCount
          });
          _context8.next = 32;
          break;

        case 24:
          arrayCounts = [];
          _context8.prev = 25;
          throw new Error('no search results');

        case 29:
          _context8.prev = 29;
          _context8.t0 = _context8["catch"](25);
          res.render('books/index2', {
            books: bookss,
            arrayCount: arrayCounts,
            error: _context8.t0
          });

        case 32:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[25, 29]]);
}));
/* Delete individual book. */

router.post('/:id/delete', asyncHandler(function _callee9(req, res) {
  var book;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(Book.findByPk(req.params.id));

        case 2:
          book = _context9.sent;

          if (!book) {
            _context9.next = 9;
            break;
          }

          _context9.next = 6;
          return regeneratorRuntime.awrap(book.destroy());

        case 6:
          res.redirect("/books");
          _context9.next = 10;
          break;

        case 9:
          res.render('notFoundError');

        case 10:
        case "end":
          return _context9.stop();
      }
    }
  });
}));
module.exports = router;