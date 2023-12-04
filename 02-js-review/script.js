// BASE DATA FOR THE EXERCISES
const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

// EXERCISES

// DESTRUCTURING
const book = getBook(3);

// objects
// standard way accessing properties in objects
const titleStandard = book.title;
const authorStandard = book.author;

const { title, author, pages, publicationDate, genres, hasMovieAdaptation } = book;
console.log(title, author, pages, publicationDate, genres, hasMovieAdaptation);

// arrays
// standard access to elements in array
const primaryGenreStandard = genres[0];
const secondaryGenreStandard = genres[1];

// deconstruct way
const [ primaryGenre, secondaryGenre ] = genres;  // will take elements in order from the list
console.log(primaryGenre, secondaryGenre);

// Using rest operator -> ... (as * in Python)
const [ first, second, ...allOthers ] = genres;  // allOthers creates list of all elements not specified
console.log(first, second, allOthers);

// in here it takes out all the elements from the list
const newGenres = [...genres, "epic fantasy"];
console.log(newGenres);

// update object using rest operator
const updatedBook = {
  ...book,
  moviePublicationDate: `2001-12-19`,  // new property
  pages: 1111,  // updated property
};

console.log(updatedBook);


// TEMPLATE LITERALS (f-string in Python)
// `` - constructor of templates
const summary = (
    `${title}, a book ${pages}-long written by the ${author} was published in 
    ${publicationDate.split("-")[0]}. 
    The movie has${hasMovieAdaptation ? '' : ' not'} the movie adaptation.`
);
console.log(summary);

// TERNARIES
const pagesRange = pages > 1000 ? 'over a thousand' : 'less than 1000'; // same as: 'over a 1000' if pages > 1000 else 'less than 1000
console.log(`Number of ${pages} for the ${title} is ${pagesRange}.`);

// ARROW FUNCTIONS
// standard way of writing function
function getYearStandard(dateString) {
  return dateString.split("-")[0]
}
console.log(getYearStandard(publicationDate));

// arrow way
const getYear = (dateString) => dateString.split("-")[0];
console.log(getYear(publicationDate));

// LOGICAL OPERATORS SHORT CIRCUITING
// and operator
console.log(true && "Some string");
// works when first operator is false - not looking in the second
console.log(false && "Some string");

console.log(hasMovieAdaptation && "This book has a movie.");
console.log("" && "string is") // empty string is false

// or operator ((works exactly the opposite way)
console.log(true || "Some string");
// works when first operator is false - not looking in the second
console.log(false || "Some string");

console.log(hasMovieAdaptation || "This book has a movie.");
console.log("" || "string is") // empty string is false

const spanishTranslation = book.translations.spanish || "Not translated to Spanish";
console.log(spanishTranslation);

// ?? - coalescing operator - returns second value only if the first is null or undefined, not when 0 or ""
const count = book.reviews.librarything?.reviewsCount ?? "no data";
console.log(`Reviews count: ${count}.`);

// optional chaining - only reading property if the properties before exist (,get(value, 0) in python)
function getTotalReviewCount(book) {
  const goodread = book.reviews.goodreads.reviewsCount;
  const libraryanything = book.reviews.librarything?.reviewsCount ?? 0;
  return goodread + libraryanything;
  
}

console.log(getTotalReviewCount(book));

// ARRAY METHODS - returns new array, not affecting the original
const books = getBooks();

// map -> run defined expression over each array element
const doubling = [1, 2, 3, 4, 5].map((el) => el * 2);
console.log(doubling);

const bookTitles = books.map((book) => book.title);  // python: book_titles = [book.get("title") for book in books]
console.log(bookTitles);

const essentialData = books.map((book) => ({
  title: book.title,
  author: book.author,
  reviewsCount: getTotalReviewCount(book),
}));
console.log(essentialData);

// filter -> filters out elements where defined expression is false
const longBooks = books.filter((book) => book.pages > 500);
console.log(longBooks.map((book) => book.pages));

const hasMovieAdaptationOnly = books.filter((book) => book.hasMovieAdaptation);
console.log(hasMovieAdaptationOnly.map((book) => ({title: book.title, movie: book.hasMovieAdaptation})));

const adventureBooks = books
    .filter((book) => book.genres.includes("adventure"))  // .includes -> python in
    .map((book) => book.title);
console.log(adventureBooks);

// reduce - sum same properties on all objects
const pagesAllBooks = books.reduce((sum, book) => sum + book.pages, 0); // sum = accumulator for value
console.log(pagesAllBooks);

// sort - changing also original array
const arr = [3, 1, 6, 5, 9];
const sortedArr = arr.sort((a, b) => a - b); // sort ascending
console.log(arr, sortedArr);

// how to keep original unaffected - use slice() -> copy
const arrB = [3, 1, 5, 2, 5]
const sortedArrB = arrB.slice().sort((a, b ) => a -b );
console.log(arrB, sortedArrB);

const sortedByPages = books.slice().sort((a, b) => b.pages - a.pages);
console.log(sortedByPages.map((book) => ({title: book.title, pages: book.pages})));

// immutable arrays
// add object to array (Python dict.update()
const newBook = {
  id: 6,
  title: "Outliers",
  autrhor: "Malcolm Gladwell",
};

const booksAfterAdd = [...books, newBook];
console.log(booksAfterAdd);

// delete book object from array
const booksAfterDelete =  booksAfterAdd.filter((book) => book.id !== 6); // not removing a book, rather filtering it out
console.log(booksAfterDelete);

// update books about book
const booksAfterUpdate = booksAfterDelete.map((book) => book.id === 5 ? {...book, title: book.title = "A Game of Thrones MF!"} : book);
console.log(booksAfterUpdate);