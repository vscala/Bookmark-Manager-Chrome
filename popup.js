console.log("popup loaded successfully!")
const urlElement = document.getElementById("inputURL");
let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
if (bookmarks == null) bookmarks = [];
document.getElementById("btnAddManual").onclick = function () {
    console.log("add manual clicked.")
    let url = urlElement.value;
    bookmarks.push(url);
    console.log(bookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

document.getElementById("btnAddSelected").onclick = function () {
    console.log("add selected clicked.")
}

document.getElementById("btnLoadPages").onclick = function () {
    console.log("load pages clicked.")
}

document.getElementById("btnModifyBookmark").onclick = function () {
    console.log("modify bookmark clicked.")
}

document.getElementById("btnDeleteBookmark").onclick = function () {
    console.log("delete bookmark clicked.")
}
