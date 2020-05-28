const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Book=require('../models').Book;
/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(error);
    }
  }
}


/* GET books listing. */
router.get('/', asyncHandler(async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit ;

  let books=await Book.findAll();
  const pageCount = books.length / limit ; 
  const arrayCount = []
  for(let i=0;i<pageCount;i++)
  {
  arrayCount.push(i);
  }
   const bookss=await Book.findAll(
    {offset: startIndex || 0,
    limit: limit || 50,
  order:[['createdAt', 'DESC']]}
  )
  res.render("books/index", { bookss, title: "moukim's library!",page,limit,arrayCount});
}));
router.get('/', asyncHandler(async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit ;

  let books=await Book.findAll();
  const pageCount = books.length / limit ; 
  const arrayCount = []
  for(let i=0;i<pageCount;i++)
  {
  arrayCount.push(i);
  }
   const bookss=await Book.findAll(
    {offset: startIndex || 0,
    limit: limit || 50,
  order:[['createdAt', 'DESC']]}
  )
  res.render("books/index", { bookss, title: "moukim's library!",page,limit,arrayCount});
}));


/* Create a new book form. */
router.get('/new', (req, res) => {
  res.render("books/new-book", { book: {}, title: "New book" });
});

/* POST create book. */
router.post('/', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/books/" + book.id);
  } catch (error) {
    if(error.name === "SequelizeValidationError") { // checking the error
      book = await Book.build(req.body);
      res.render("books/new-book", { book, errors: error.errors, title: "New book" })
    } else {
      throw error; // error caught in the asyncHandler's catch block
    }  
  }
}));

/* Edit book form. */
router.get("/:id/edit", asyncHandler(async(req, res) => {
  const book=await Book.findByPk(req.params.id);
  if(book) {
 res.render("books/update-book", { book, title: "Edit book" });
  }
  else {
    res.render('notFoundError');
 
  }
}));

/* GET individual book. */
router.get('/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("books/show", { book, title: book.title });  
  } else {
    res.render('notFoundError');
  }
}));


/* Update a book. */
router.post('/:id/edit', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if(book) {
      await book.update(req.body);
      res.redirect("/books/" + book.id); 
    } else {
      res.render('notFoundError');
    }
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id; // make sure correct book gets updated
      res.render("books/update-book", { book, errors: error.errors, title: "Edit book" })
    } else {
      throw error;
    }
  }
}));

/* Delete book form. */
router.get("/:id/delete", asyncHandler(async (req, res) => {
 const book=await Book.findByPk(req.params.id);
 if(book) {
  res.render("books/delete", { book, title: "Delete book" });
 }
 else {
  res.render('notFoundError');
}
}));
router.get("/",asyncHandler(async(req,res)=>{

}));

router.post("/search", asyncHandler(async(req,res)=>{
  const  query = req.body.query;
 const path=req.path ; 
 const Op = Sequelize.Op

const books=await Book.findAll({
  where: {
    [Op.or]:{
   title: {
    [Op.like]: '%'+query+'%'
   }
   ,
   author:{
    [Op.like]: '%'+query+'%'
   },
   genre:{
    [Op.like]: '%'+query+'%'
   },
   year:{
    [Op.like]: '%'+query+'%'
   }
  }
}});
if(path.includes('search') && books.length>0){
  res.render("books/index2", { books, title: "moukim's library!"});
}
else if(books.length>0){
  res.render("books/index", { books, title: "moukim's library!"});
} else{
  const arrayCounts = []
 try{
    throw new Error('no search results')}
 catch(error){ 
   res.render('books/index',{bookss:books,arrayCount:arrayCounts, error});}
}
}));


/* Delete individual book. */
router.post('/:id/delete', asyncHandler(async (req ,res) => {
 const book=await Book.findByPk(req.params.id);
 if(book) {
 await book.destroy();
  res.redirect("/books");
} else {
  res.render('notFoundError');
}
}));

module.exports = router;