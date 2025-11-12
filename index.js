const addRecipeBtn = document.getElementById("addRecipe")
const deleteBtn = document.getElementById("deleteBtn")
let inputField = document.getElementById("input")
let ulEl = document.getElementById("ulEl")
let bookmarks = []

//------ Render form Local storage -----
let booksFromLocalStoreage = JSON.parse(localStorage.getItem("Recipin Bookmarks"))
if (booksFromLocalStoreage){
    bookmarks = booksFromLocalStoreage
    renderBooks()
}

// ------ Event listeners ------
addRecipeBtn.addEventListener('click',()=>{
    if(inputField.value){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        bookmarks.push({
            name:inputField.value,
            url: tabs[0].url
        })
        inputField.value=""
        localStorage.setItem("Recipin Bookmarks",JSON.stringify(bookmarks))
        renderBooks()
        })

    }
    else{
        alert("No name added")
    }
})

deleteBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete all bookmarks?")) {
        bookmarks = [];
        localStorage.removeItem("Recipin Bookmarks");
        renderBooks();
        console.log("All bookmarks deleted!");
    }
});

function renderBooks() {
    let listItems = ""
    for (let i = 0; i < bookmarks.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${bookmarks[i].url}'>
                    ${bookmarks[i].name}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}

renderBooks()