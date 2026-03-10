const library = [];
const mainContent = document.querySelector(".main-content");

const book = {
    _id: 0,
    _author: "",
    _title: "",
    _pages: 0,
    _isRead: false,

    setBookData(author, title, pages, isRead)
    {
        this._author = author;
        this._title = title;
        this._pages = pages;
        this._isRead = isRead;
    },

    getBookData()
    {
        return {author: this._author, title: this._title, pages: this._pages, isRead: this._isRead};
    }
};

function Book(author, title, pages, isRead)
{
    this._id = crypto.randomUUID();
    this._author = author;
    this._title = title;
    this._pages = pages;
    this._isRead = isRead;  
}

function addBookToLibrary(book)
{
    library.push(book);
}

function displayBooks()
{
    const bookContainer = document.querySelector(".book-container")
    bookContainer.innerHTML = "";

    library.forEach((book) => 
    {
        // Create book card elements
        const newBookCard = document.createElement("div");
        const newBookTitle = document.createElement("div");
        const newBookAuthor = document.createElement("div");
        const newBookPages = document.createElement("div");
        const newBookStatus = document.createElement("button");
        const newBookDelete = document.createElement("button");

        // Set classes and attributes
        newBookCard.classList.add("bookCard");
        newBookTitle.classList.add("bookTitle");
        newBookAuthor.classList.add("author");
        newBookPages.classList.add("pages");
        newBookStatus.classList.add("status");
        newBookDelete.classList.add("delete-button");
        newBookDelete.textContent = "Delete";

        // Set book data
        newBookTitle.textContent = book._title;
        newBookAuthor.textContent = book._author;
        newBookPages.textContent = book._pages;
        newBookStatus.textContent = book._isRead ? "Read" : "Not Read";

        // Set data
        newBookCard.dataset.id = book._id; // <div data-id=...>

        // Append elements to the book container
        newBookCard.appendChild(newBookTitle);
        newBookCard.appendChild(newBookAuthor);
        newBookCard.appendChild(newBookPages);
        newBookCard.appendChild(newBookStatus);
        newBookCard.appendChild(newBookDelete);
        bookContainer.appendChild(newBookCard);
    });
}

const addBtn = document.querySelector(".addBook");
const inputs = document.querySelectorAll(".textbox");

addBtn.addEventListener('click', () => 
{
    let flag = false;
    inputs.forEach(input => 
    {
            if (input.value == undefined || input.value == "") 
            flag = true;
    });

    if (flag != true)
    {
        const book = new Book(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value == "read" ? true : false);
        addBookToLibrary(book);
        displayBooks();
    }
})

// Add prototype method to toggle read status
Book.prototype.toggleReadStatus = function()
{
    this._isRead = !this._isRead;
}

// Event delegation for delete buttons and toggle read status buttons

const bookContainer = document.querySelector(".book-container");

bookContainer.addEventListener('click', (event) =>
{
    // Check if the clicked element is a delete button
    if (event.target.classList.contains("delete-button")) 
    {
        alert("Are you sure you want to delete this book?");

        const bookCard = event.target.closest(".bookCard");
        const bookId = bookCard.dataset.id;
        const bookIndex = library.findIndex(book => book._id === bookId);
        if (bookIndex !== -1)
        {        
            library.splice(bookIndex, 1);
            displayBooks();
        }
    }
    // Check if the clicked element is a status button
    else if (event.target.classList.contains("status")) 
    {
        const bookCard = event.target.closest(".bookCard");
        const bookId = bookCard.dataset.id;
        const book = library.find(book => book._id === bookId);
        if (book) 
        {
            book.toggleReadStatus();
            displayBooks();
        }
    }
})  