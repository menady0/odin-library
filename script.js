let library = [];

function Book(title, author, pages, isRead, imgUrl) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.imgUrl = imgUrl;
}

function addBookToLibrary(title, author, pages, isRead, imgUrl) {
  const myBook = new Book(title, author, pages, isRead, imgUrl);
  library.push(myBook);
}
// addBookToLibrary("Atomic Habits", "Mina", 22, false, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPS8ehjqvJkVzmFsoX2Eqvix7LAollSLyiuSSdoxQBo2VW-0dPZPOeGJ4&s=10");
// addBookToLibrary("My Library", "Mina", 22, true, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPS8ehjqvJkVzmFsoX2Eqvix7LAollSLyiuSSdoxQBo2VW-0dPZPOeGJ4&s=10");
// addBookToLibrary("My Library", "Mina", 22, false, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPS8ehjqvJkVzmFsoX2Eqvix7LAollSLyiuSSdoxQBo2VW-0dPZPOeGJ4&s=10");
// addBookToLibrary("My Library", "Mina", 22, true, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPS8ehjqvJkVzmFsoX2Eqvix7LAollSLyiuSSdoxQBo2VW-0dPZPOeGJ4&s=10");
// addBookToLibrary("My Library", "Mina", 22, false, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPS8ehjqvJkVzmFsoX2Eqvix7LAollSLyiuSSdoxQBo2VW-0dPZPOeGJ4&s=10");
// addBookToLibrary("My Library", "Mina", 22, false, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPS8ehjqvJkVzmFsoX2Eqvix7LAollSLyiuSSdoxQBo2VW-0dPZPOeGJ4&s=10");
// addBookToLibrary("My Library", "Mina", 22, true, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPS8ehjqvJkVzmFsoX2Eqvix7LAollSLyiuSSdoxQBo2VW-0dPZPOeGJ4&s=10");
const books = document.querySelector(".books");
function createBook(book) {
  const status = book.isRead ? "read" : "unread";
  const card = document.createElement("div");
  card.classList.add("book");

  card.innerHTML = `
    <img src="${book.imgUrl}" alt="${book.title}" />

    <div class="book-context">
      <div class="title">
        <h2>${book.title}</h2>
        <span class="mdi mdi-delete"></span>
      </div>

      <p class="author">${book.author}</p>
      <p class="pages">${book.pages}</p>

      <span class="tag ${status}">${status}</span>

      <button>Toggle</button>
    </div>
  `;

  books.appendChild(card);
}
function displayBooks() {
  for (const book in library) {
    if (!Object.hasOwn(library, book)) continue;
    
    const element = library[book];
    createBook(element);
  }
}
displayBooks();



const dialog = document.querySelector("#bookDialog");
const addBookBtn = document.querySelector("#addBook");
const cancelBookBtn = document.querySelector("#cancelBook");
const form = document.querySelector(".book-form");

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const title = formData.get("title");
  const author = formData.get("author");
  const pages = Number(formData.get("pages"));
  const isRead = formData.get("isRead") === "true";
  const imgUrl = formData.get("imgUrl");

  const book = new Book(
    title,
    author,
    pages,
    isRead,
    imgUrl
  );

  library.push(book)
  displayBooks();

  dialog.close();
});

cancelBookBtn.addEventListener("click", () => {
  dialog.close();
});