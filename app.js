let library;

const DEFAULT_DATA = [
    { name: "The Return of the King", author: "Tolkien", status: "read" },
    {
        name: "Gardens of the Moon",
        author: "Steven Erikson",
        status: "not read",
    },
    { name: "Alice in Wonderland", author: "Lewis Caroll", status: "unread" },
];

const $name = document.querySelector("#name");
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
            
        }
    })