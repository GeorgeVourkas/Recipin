const addRecipeBtn = document.getElementById("addRecipe")
const deleteBtn = document.getElementById("deleteBtn")
let inputField = document.getElementById("input")
let ulEl = document.getElementById("ulEl")
let bookmarks = []


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
                <span>
                    ${getDate()}
                </span>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}


function getDate() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

//------ Render form Local storage -----
let booksFromLocalStoreage = JSON.parse(localStorage.getItem("Recipin Bookmarks"))
if (booksFromLocalStoreage){
    bookmarks = booksFromLocalStoreage
    renderBooks()
}
