// document.addEventListener("DOMContentLoaded", function() {});

const bookDiv = document.querySelector("#list-panel");
const booksUl = document.querySelector("#list");
const bookDetailsDiv = document.querySelector("#show-panel");
const mainUser = {
  id: 1,
  username: "pouros"
};

// render a title
function renderBookTitle(book) {
  const titleLi = document.createElement("li");
  titleLi.id = book.id;
  titleLi.innerHTML = `
    <p>${book.title}</p>`;
  booksUl.appendChild(titleLi);
  // when the title is clicked, invoke the renderBookDetails function for that book
  titleLi.addEventListener("click", () => renderBookDetails(book));
}

// display all the book details (when title clicked)
function renderBookDetails(book) {
  bookDetailsDiv.innerHTML = `
        <h2>${book.title}</h2>
        <img src=${book.img_url}>
        <p>${book.description}</p>
        <ul id='book-users'>${book.users
          .map(user => `<li id='user-${user.id}'>${user.username}</li>`)
          .join(" ")}
        </ul>
        <button>Read Book</button>
    `;

  const bookLikeBtn = bookDetailsDiv.querySelector("button");

  bookLikeBtn.addEventListener("click", () => updateReadList(book));
}

// add current user to the read list:
function updateReadList(book) {
  console.log(book);

  // conditional wrapper - is the user already in the list?
  if (!userHasReadBook(book)) {
    // no user returned - has not read book
    // store ul in a variable so the whole user list is now in local scope
    const bookUsers = document.querySelector("#book-users");
    // create new li in book.users, with the user in it
    bookUserLi = document.createElement("li");
    bookUserLi.id = `user-${mainUser.id}`;
    bookUserLi.innerHTML = mainUser.username;
    // append the li to the ul
    bookUsers.append(bookUserLi);
    // add the user to the array
    book.users.push(mainUser);
    // persist user to db
    updateBook(book);
  } else {
    // user has read book
    alert("You've already read this book!");
  }
}

// check if the user is in the book list (reusable function):
function userHasReadBook(book) {
  const foundUser = book.users.find(bookuser => bookuser.id === mainUser.id);
  // find iterates over an array and compares each element in turn
  return foundUser;
}

// display all books
function allBookTitles(books) {
  console.log("all titles", books);
  books.forEach(renderBookTitle);
}

function init() {
  getBooks().then(allBookTitles);
}

init();
