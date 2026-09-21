let library = [];

class Book {
  constructor(title, author, pages, isRead, imgUrl) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.imgUrl = imgUrl;
  }
}

function addBookToLibrary(title, author, pages, isRead, imgUrl) {
  const myBook = new Book(title, author, pages, isRead, imgUrl);
  library.push(myBook);
}
addBookToLibrary(
  "Atomic Habits",
  "James Clear",
  319,
  true,
  "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg",
);
addBookToLibrary(
  "Rich Dad Poor Dad",
  "Robert T. Kiyosaki",
  195,
  false,
  "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg",
);
addBookToLibrary(
  "The Psychology of Money",
  "Morgan Housel",
  242,
  true,
  "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1581527774i/41881472.jpg",
);
const books = document.querySelector(".books");
function createBook(book) {
  const status = book.isRead ? "read" : "unread";
  const card = document.createElement("div");
  card.classList.add("book");
  card.setAttribute("data-id", book.id);

  card.innerHTML = `
    <img src="${book.imgUrl}" alt="${book.title}" />

    <div class="book-context">
      <div class="title">
        <h2>${book.title}</h2>
        <span class="mdi mdi-delete btnDelete"></span>
      </div>

      <p class="author">${book.author}</p>
      <p class="pages">${book.pages}</p>

      <span class="tag ${status}">${status}</span>

      <button class="btnToggle">Toggle</button>
    </div>
  `;

  books.appendChild(card);
}
function renderEmptyState() {
  books.innerHTML = `
    <div class="empty-state">
      <span class="mdi mdi-book-open-page-variant-outline empty-icon"></span>
      <h2>Your library is empty</h2>
      <p>Click the button below to add your first book to the collection.</p>
    </div>
  `;
}
function displayBooks() {
  books.innerHTML = "";
  if (!library || library.length === 0) {
    renderEmptyState();
    return;
  }
  library.forEach((element) => createBook(element));
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

  const book = new Book(title, author, pages, isRead, imgUrl);

  library.push(book);
  displayBooks();
  form.reset();
  dialog.close();
});

cancelBookBtn.addEventListener("click", () => {
  dialog.close();
});
books.addEventListener("click", (e) => {
  const target = e.target;
  const card = target.closest(".book");
  if (!card) return;

  const bookId = card.dataset.id;
  // Handle Delete Button
  const index = library.findIndex((item) => item.id === bookId);
  if (target.classList.contains("btnDelete")) {
    card.remove();
    if (index !== -1) {
      library.splice(index, 1);
    }
    if (library.length === 0) {
      displayBooks();
    }
  }
  // Handle Toggle Button
  if (target.classList.contains("btnToggle")) {
    const tag = card.querySelector(".tag");
    const isRead = tag.classList.contains("read");
    tag.classList.toggle("read", !isRead);
    tag.classList.toggle("unread", isRead);
    tag.textContent = !isRead ? "read" : "unread";

    library[index].isRead = !isRead;
  }
});