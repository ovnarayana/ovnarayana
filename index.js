const express = require("express");

// database
const database = require("./database")

// initialize express
const booky = express();

/*
Route               /
Description       Get all the books  done
Access             Public
Parameter          none
Methods            Get
 */

booky.get("/",(req,res) => {
  return res.json({book: database.books})
});

/*
Route               /is
Description       Get specific book on ISBN done
Access             Public
Parameter          isbn
Methods            Get
 */

booky.get("/is/:isbn",(req,res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );
 
  if(getSpecificBook.length === 0) {
    return res.json({error: `No book found for the ISBN of ${req.params.isbn}`});
  }
  return res.json({book: getSpecificBook})
});

/*
Route               /c
Description       Get specific book on category  done
Access             Public
Parameter          category
Methods            Get
 */

booky.get("/c/:category",(req,res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.category.includes(req.params.category)
    )

    if(getSpecificBook.length === 0) {
      return res.json({error: `no book found for the category of $(req.params.category)`})
    }
    return res.json({book: getSpecificBook})
})


/*
Route               /en
Description       Get specific book on languages
Access             Public
Parameter          languages
Methods            Get
 */

 booky.get("/en/:languages",(req,res) => {
   const getSpecificBook = database.books.filter(
     (book) => book.language === req.params.languages
     )
     if(getSpecificBook.length === 0) {
       return res.json({error: `no book found for the language of $(req.params.languages)`})
     } else {
       return res.json({book: getSpecificBook})
     }

 })

  // authors

  /*
Route               /author
Description       Get all authers
Access             Public
Parameter          none
Methods            Get
 */

 booky.get("/author",(req,res) => {
   return res.json({book: database.author})
 })

  /*
Route               /author/book
Description       Get all authers based on books
Access             Public
Parameter          isbn
Methods            Get
 */

 booky.get("/author/book/:isbn",(req,res) => {
   const getSpecificAuthor = database.author.filter(
     (author) => author.books.includes(req.params.isbn)
   )
   if(getSpecificAuthor.length === 0) {
     return res.json({error: `no author found for the book of ${req.params.isbn}`
    })
   }
   return res.json({authors: getSpecificAuthor})
 })

  /*
Route               /author/book
Description       Get all authers
Access             Public
Parameter          isbn
Methods            Get
 */


 booky.get("/author/id/:id",(req,res) => {
  const getSpecificAuthor = database.author.filter(
    (author) => author.id === parseInt(req.params.id)
  )
  if(getSpecificAuthor.length === 0) {
    return res.json({error: `no author found for the book of ${req.params.id}`
   })
  }
  return res.json({author: getSpecificAuthor})
})


 /*
Route               /publication
Description       Get all publication
Access             Public
Parameter          none
Methods            Get
 */

 booky.get("/publications",(req,res) => {
  return res.json({book: database.publication})
 });


/*
Route               /pub
Description       Get specific publication based on id
Access             Public
Parameter          id
Methods            Get
 */

 booky.get("/pub/:id",(req,res) => {
   const getSpecificPublication = database.publication.filter(
    (book) => book.id === parseInt(req.params.id)   
   )
   if(getSpecificPublication.length === 0){
     return res.json({error: `no author found for the book of ${req.params.id}` 
    })
   } else{
     return res.json({publications: getSpecificPublication})
   }
 });

 /*
Route               /pub
Description       Get specific publication based on id
Access             Public
Parameter          id
Methods            Get
 */

booky.get("/pub/book/:list",(req,res) => {
  const getSpecificPublication = database.publication.filter(
    (public) => public.books.includes(req.params.list)  
  )  
  if(getSpecificPublication.length === 0){
    return res.json({error: `no author found for the book of ${req.params.list}` 
  })
  } else{
    return res.json({publication: getSpecificPublication})
  }
})

booky.listen(3000,() => {
    console.log("server is up and run");
});