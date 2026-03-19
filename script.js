const library = [];
const mainContent = document.querySelector(".main-content");

class Book
{
    #id = 0;
    #author = "";
    #title = "";
    #pages = "";
    #isRead = false;

    constructor(author, title, pages, isRead)
    {
        this.#id = crypto.randomUUID();
        this.#author = author;
        this.#title = title;
        this.#pages = pages;
        this.#isRead = isRead;
    }

    get id()
    {
        return this.#id;
    }

    get author()
    {
        return this.#author;
    }  

    get title()
    {
        return this.#title;
    }
    
    get pages()
    {
        return this.#pages;
    }

    get isRead()
    {
        return this.#isRead;
    }

    toggleReadStatus()
    {
        this.#isRead = !this.#isRead;
    }
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
        newBookTitle.textContent = book.title;
        newBookAuthor.textContent = book.author;
        newBookPages.textContent = book.pages;
        newBookStatus.textContent = book.isRead ? "Read" : "Not Read";

        // Set data
        newBookCard.dataset.id = book.id; // <div data-id=...>

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

// Event delegation for delete buttons and toggle read status buttons

const bookContainer = document.querySelector(".book-container");

bookContainer.addEventListener('click', (event) =>
{
    // Check if the clicked element is a delete button
    if (event.target.classList.contains("delete-button")) 
    {
        if (!confirm("Are you sure you want to delete this book?")) return;

        const bookCard = event.target.closest(".bookCard");
        const bookId = bookCard.dataset.id;
        const bookIndex = library.findIndex(book => book.id === bookId);
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
        const book = library.find(book => book.id === bookId);
        if (book) 
        {
            book.toggleReadStatus();
            displayBooks();
        }
    }
})  