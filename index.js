const express = require("express");
const bodyParser = require("body-parser")
// database
const database = require("./database");

// initialize express
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

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

 booky.get("/pub",(req,res) => {
  return res.json({book: database.publication})
 });


/*
Route               /pub
Description       Get specific publication based on id
Access             Public
Parameter          id
Methods            Get
 */

 booky.get("/pub/id/:id",(req,res) => {
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


/*
Route               /book/new
Description       Add new books
Access             Public
Parameter          id
Methods            Get
 */

 booky.post("/book/new",(req,res) => {
   const newBook = req.body;  // try to push new book into body(.body)
   database.books.push(newBook)
   return res.json({updatedBooks: database.books});
  });

  /*
Route               /author/new
Description       Add new authors
Access             Public
Parameter          id
Methods            Get
 */

 booky.post("/author/new",(req,res) => {
     const newAuthor = req.body;
     database.author.push(newAuthor);
     return res.json({updatedAuthor: database.author})
 });

 /*
Route               /author/new
Description       Add new authors
Access             Public
Parameter          id
Methods            post
 */

 booky.post("/publication/new",(req,res) => {
   const newPublication =req.body;
   database.publication.push(newPublication);
   return res.json({updatedPublication: database.publication});
 });

 /*
Route               /publication/update/book
Description Update    /add new publication
Access                 PUBLIC
Parameter              isbn
Methods                  PUT
*/

booky.put("/publication/update/book/:isbn", (req,res) => {
  //Update the publication database
  database.publication.forEach((pub) => {
  if(pub.id === req.body.pubId) {
  return pub.books.push(req.params.isbn);
  }
  });
  
  //Update the book database
  database.books.forEach((book) => {
  if(book.ISBN === req.params.isbn) {
  book.publications = req.body.pubId;
  return;
  }
  });
  
  return res.json(
  {
  books: database.books,
  publications: database.publication,
  message: "Successfully updated publications"
  }
  );
  }); 

  /****DELETE*****/
/*
Route           /book/delete
Description       Delete a book
Access           PUBLIC
Parameter        isbn
Methods          DELETE
*/

booky.delete("/book/delete/:isbn", (req,res) => {
  //Whichever book that doesnot match with the isbn , just send it to an updatedBookDatabase array
  //and rest will be filtered out
  
  const updatedBookDatabase = database.books.filter(
  (book) => book.ISBN !== req.params.isbn
  )
  database.books = updatedBookDatabase;
  
  return res.json({books: database.books});
  });
  
  

  /*
Route /book/delete/author
Description Delete an author from a book and vice versa
Access PUBLIC
Parameter isbn, authorId
Methods DELETE
*/

booky.delete("/book/delete/author/:isbn/:authorId", (req,res) => {
  //Update the book database
  database.books.forEach((book)=>{
  if(book.ISBN === req.params.isbn) {
  const newAuthorList = book.author.filter(
  (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
  );
  book.author = newAuthorList;
  return;
  }
  });
  
  
  //Update the author database
  database.author.forEach((eachAuthor) => {
  if(eachAuthor.id === parseInt(req.params.authorId)) {
  const newBookList = eachAuthor.books.filter(
  (book) => book !== req.params.isbn
  );
  eachAuthor.books = newBookList;
  return;
  }
  });
  
  return res.json({
  book: database.books,
  author: database.author,
  message: "Author was deleted!!!!"
  });
  });
  

booky.listen(3000,() => {
    console.log("server is up and run");
});