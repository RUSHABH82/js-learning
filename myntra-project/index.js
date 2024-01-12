const bagItems = JSON.parse(localStorage.getItem('bag-items') || '[]');

onLoad()

function onLoad() {
    appendNavigate();
    displayItemsOnHomePage();
    updateBagItemCount()
}

function addToBag(itemId) {
    if (typeof itemId === "string") {
        const bagItem = bagItems.find(value => value.itemId === itemId);
        bagItem ? bagItem.count++ : bagItems.push({itemId: itemId, count: 1});
        updateBagItemCount();
    }
}


function updateBagItemCount() {
    const bagItemCountElement = document.getElementById("bag-item-count");
    bagItems.length > 0 ?
        bagItemCountElement.style.visibility = "visible" :
        bagItemCountElement.style.visibility = "hidden";
    bagItemCountElement.innerText = bagItems.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0)
    localStorage.setItem("bag-items", JSON.stringify(bagItems));
}

function displayItemsOnHomePage() {
    const itemsContainerElement = document.getElementById('items-container');
    itemsContainerElement && items.forEach(value => itemsContainerElement.appendChild(generateInnerHtmlFormItem(value)));
}

function generateInnerHtmlFormItem({
                                       id,
                                       image,
                                       rating,
                                       company,
                                       item_name,
                                       current_price,
                                       original_price,
                                       discount_percentage
                                   }) {
    const element = document.createElement('div');
    element.innerHTML = `
            <img class="item-image" src=${image} alt="Image item">
            <div class="rating">${rating.stars}
                <svg height="15" viewBox="0 0 576 512">
                    <path fill="#fff705"
                          d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                </svg>
                | ${rating.count}
            </div>
            <div class="company-name">${company}</div>
            <div class="item-name">${item_name}</div>
            <div class="price">
                <span class="current-price">Rs ${current_price}</span>
                <span class="original-price">Rs ${original_price}</span>
                <span class="current-discount">(${discount_percentage}% OFF)</span>
            </div>`
    const addToBagButton = document.createElement('button');
    addToBagButton.innerText = "Add To Bag";
    addToBagButton.className = "btn-add-bag";
    addToBagButton.addEventListener('click', () => addToBag(id))
    element.className = "item-container";
    element.appendChild(addToBagButton)
    return element;
}

function appendNavigate() {
    const navigateElement = document.getElementById("navigate_helper")
    navigateElement.setAttribute("href", navigateElement.getAttribute("href") + window.location.search);
}
