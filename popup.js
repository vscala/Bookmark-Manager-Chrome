/**
 * Core extension functionality, deals with button event handlers and
 * storing / recalling bookmarks.
 *
 * Author(s): Vincent Scala
 *
 * TODO: store more info other than just the bookmark URL in bookmarks array
 */

const urlElement = document.getElementById("inputURL");
let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
if (bookmarks == null) bookmarks = [];

/**
 * Event handler for "Add page by URL" button:
 * takes urlElement value and appends it to bookmark array
 */
document.getElementById("btnAddManual").onclick = function () {
    console.log("add manual clicked.")
    bookmarks.push(urlElement.value);
    updateBookmarks();
}

/**
 * Event handler for btnAddSelected button:
 * queries selected tabs and adds their urls to bookmark array
 */
document.getElementById("btnAddSelected").onclick = async function () {
    console.log("add selected clicked.")

    let selectedTabs = await chrome.tabs.query({highlighted: true})
    let i;
    for (i = 0; i < selectedTabs.length; i++) {
        bookmarks.push(selectedTabs[i]["url"]);
    }

    updateBookmarks();
}

/**
 * Event handler for btnLoadPages button:
 * loads first page in bookmarks array
 * TODO: change to load specific entry (currently loads and removes first page)
 */
document.getElementById("btnLoadPages").onclick = function () {
    console.log("load pages clicked.")
    let url_ = bookmarks.shift()
    console.log("Loaded " + url_);
    updateBookmarks();
    chrome.tabs.create({
        url: url_
    });
}

/**
 * Event handler for btnModifyBookmark button:
 * TODO: implement bookmark modifying
 */
document.getElementById("btnModifyBookmark").onclick = function () {
    console.log("modify bookmark clicked.")
    updateBookmarks();
}

/**
 * Event handler for btnDeleteBookmark button:
 * TODO: change to delete specific entry (currently pops first element)
 */
document.getElementById("btnDeleteBookmark").onclick = function () {
    console.log("delete bookmark clicked.")
    if (bookmarks.length !== 0)
        bookmarks.shift();
    updateBookmarks();
}

/**
 * Event handler for btnClearBookmarks button:
 * clears all bookmarks
 */
document.getElementById("btnClearBookmarks").onclick = function () {
    bookmarks = [];
    updateBookmarks();
}

// Run to update localStorage for bookmarks
function updateBookmarks() {
    console.log("Current bookmarks: " + bookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    updateTable();
}

function updateTable() {
    const table = document.getElementById("tableBookmarks");
    table.innerHTML = "";

    let i;
    for (i = 0; i < bookmarks.length; i++) {
        const row = table.insertRow(i);
        const cell = row.insertCell(0);
        cell.innerHTML = bookmarks[i];
    }
}

// Verifying popup loaded successfully
updateTable()
console.log("popup loaded successfully!")