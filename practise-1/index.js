welcomeAlert()

function welcomeAlert() {
    alert("welcome to page");
}


function addToBagAlert() {
    alert("added to bag")
}

function addToWishLisAlert() {
    alert("Add to wishlist")
}

function changeTitle() {
    document.getElementById("page_title").innerHTML = `New title ${new Date().toLocaleTimeString()}`
}