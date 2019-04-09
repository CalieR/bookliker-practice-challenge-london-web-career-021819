const BOOKS_URL = "http://localhost:3000/books";

// get all the books

function getBooks() {
  return fetch(BOOKS_URL).then(resp => resp.json());
}

// update the book likes

function updateBook(book) {
  return fetch(BOOKS_URL + `/${book.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(book)
  }).then(resp => resp.json());
}
