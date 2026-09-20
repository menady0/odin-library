let library = []

function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID()
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary (title, author, pages, isRead){
  const myBook = new Book(title, author, pages, isRead);
  library.push(myBook);
}
addBookToLibrary('My Library', "Mina", 22, false)
addBookToLibrary('My Library', "Mina", 22, false)
addBookToLibrary('My Library', "Mina", 22, false)

for (const book in library) {
  if (!Object.hasOwn(library, book)) continue;
  
  const element = library[book];
  console.table(element)
}