let library;

const DEFAULT_DATA = [
    { title: "The Return of the King", author: "Tolkien", status: "read" },
    {
        title: "Gardens of the Moon",
        author: "Steven Erikson",
        status: "unread",
    },
    { title: "Alice in Wonderland", author: "Lewis Caroll", status: "unread" },
];

const $title = document.querySelector("#title");
const $author = document.querySelector("#author");
const $status = document.querySelector("#status");
const $tableBody = document.querySelector("#book-table-body");
const $form = document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary();
    render();
    clearForm();
});
const $table = document
    .querySelector("table")
    .addEventListener("click", (e) => {
        const currentTarget = e.target.parentNode.parentNode.childNodes[1];
        if (e.target.innerHTML == "delete") {
            if (confirm(`Are you sure you'd like to delete ${currentTarget.innerText}?`))
                deleteBook(findBook(library, currentTarget.innerText));
        }
        if (e.target.classList.contains("status-button")) {
            changeStatus(findBook(libary, currentTarget.innerText));
        }
        updateLocalStorage();
        render();
    });

class Book {
    constructor(title, author, status) {
        this.title = title;
        this.author = author;
        this.status = status;
    }
}

function addBookToLibrary() {
    if ($title.value.length === 0 || $author.value.length === 0) {
        alert("Please fill the missing fields.");
        return;
    }
    const newBook = new Book($title.value, $author.value, $status.value);

    library.push(newBook);
    updateLocalStorage();
}

function changeStatus(book) {
    if (library[book].status === "read") {
        library[book].status = "unread";
    } else library[book].status = "read";
}

function deleteBook(currentBook) {
    library.splice(currentBook, currentBook + 1);
}

function findBook(libraryArray, title) {
    if(libraryArray.length === 0 || libraryArray === null) {
        return;
    }
    for (book of libraryArray)
        if (book.title === title) {
            return libraryArray.indexOf(book);
        }
}

function clearForm() {
    $title.value = "";
    $author.value = "";
}

function updateLocalStorage() {
    localStorage.setItem("library", JSON.stringify(library));
}

function checkLocalStorage() {
    if (localStorage.getItem("library")) {
        library = JSON.parse(localStorage.getItem("library"));
    } else {
        library = DEFAULT_DATA;
    }
}

function render () {
    checkLocalStorage();
    $tableBody.innerHTML = "";
    library.forEach((book) => {
        const htmlBook = `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td><button class="status-button btn btn-light">${book.status}</button></td>
                <td><button class="delete btn btn-danger">delete</button></td>
            </tr>
            `;
        $tableBody.insertAdjacentHTML("afterbegin", htmlBook);
    });
}

render();