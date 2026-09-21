const library = [];

class Book {
  constructor(title, author, pages, isRead, imgUrl) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.imgUrl = imgUrl;
  }

  toggleRead() {
    this.isRead = !this.isRead;
  }
}

// --- Sample data (kept for demo) ---
function addSampleBooks() {
  const samples = [
    [
      "Atomic Habits",
      "James Clear",
      319,
      true,
      "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg",
    ],
    [
      "Rich Dad Poor Dad",
      "Robert T. Kiyosaki",
      195,
      false,
      "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg",
    ],
    [
      "The Psychology of Money",
      "Morgan Housel",
      242,
      true,
      "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1581527774i/41881472.jpg",
    ],
  ];

  samples.forEach(([title, author, pages, isRead, imgUrl]) =>
    library.push(new Book(title, author, pages, isRead, imgUrl)),
  );
}

// --- DOM & selectors ---
const booksContainer = document.querySelector(".books");
const dialog = document.querySelector("#bookDialog");
const addBookBtn = document.querySelector("#addBook");
const cancelBookBtn = document.querySelector("#cancelBook");
const form = document.querySelector(".book-form");

// --- UI helpers ---
function createBookElement(book) {
  const status = book.isRead ? "read" : "unread";

  const card = document.createElement("div");
  card.className = "book";
  card.dataset.id = book.id;

  const img = document.createElement("img");
  img.src = book.imgUrl;
  img.alt = book.title;

  const ctx = document.createElement("div");
  ctx.className = "book-context";

  const titleRow = document.createElement("div");
  titleRow.className = "title";

  const h2 = document.createElement("h2");
  h2.textContent = book.title;

  const del = document.createElement("span");
  del.className = "mdi mdi-delete btnDelete";

  titleRow.append(h2, del);

  const authorP = document.createElement("p");
  authorP.className = "author";
  authorP.textContent = book.author;

  const pagesP = document.createElement("p");
  pagesP.className = "pages";
  pagesP.textContent = book.pages;

  const tag = document.createElement("span");
  tag.className = `tag ${status}`;
  tag.textContent = status;

  const toggleBtn = document.createElement("button");
  toggleBtn.className = "btnToggle";
  toggleBtn.textContent = "Toggle";

  ctx.append(titleRow, authorP, pagesP, tag, toggleBtn);
  card.append(img, ctx);

  return card;
}

function renderEmptyState() {
  booksContainer.innerHTML = `
    <div class="empty-state">
      <span class="mdi mdi-book-open-page-variant-outline empty-icon"></span>
      <h2>Your library is empty</h2>
      <p>Click the button below to add your first book to the collection.</p>
    </div>
  `;
}

function renderBooks() {
  booksContainer.innerHTML = "";
  if (!library.length) {
    renderEmptyState();
    return;
  }

  const fragment = document.createDocumentFragment();
  library.forEach((book) => fragment.appendChild(createBookElement(book)));
  booksContainer.appendChild(fragment);
}

// --- Event handlers ---
function openDialog() {
  dialog.showModal();
}

function closeDialog() {
  dialog.close();
}

function handleFormSubmit(event) {
  event.preventDefault();

  const data = new FormData(form);
  const title = data.get("title");
  const author = data.get("author");
  const pages = Number(data.get("pages"));
  const isRead = data.get("isRead") === "true";
  const imgUrl = data.get("imgUrl");

  const book = new Book(title, author, pages, isRead, imgUrl);
  library.push(book);

  renderBooks();
  form.reset();
  closeDialog();
}

function handleBooksClick(e) {
  const target = e.target;
  const card = target.closest(".book");
  if (!card) return;

  const bookId = card.dataset.id;
  const index = library.findIndex((b) => b.id === bookId);

  if (target.classList.contains("btnDelete")) {
    if (index !== -1) library.splice(index, 1);
    renderBooks();
    return;
  }

  if (target.classList.contains("btnToggle")) {
    const book = library[index];
    if (!book) return;
    book.toggleRead();
    const tag = card.querySelector(".tag");
    const newStatus = book.isRead ? "read" : "unread";
    tag.className = `tag ${newStatus}`;
    tag.textContent = newStatus;
  }
}

// --- Initialization ---
function init() {
  addSampleBooks();
  renderBooks();

  addBookBtn.addEventListener("click", openDialog);
  cancelBookBtn.addEventListener("click", closeDialog);
  form.addEventListener("submit", handleFormSubmit);
  booksContainer.addEventListener("click", handleBooksClick);
}

init();
