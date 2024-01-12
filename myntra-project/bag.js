const bagItemsObject = [];

const bagSummery = {
    totalMrp: 0,
    discountOnMRP: 0,
    convenienceFee: 0,
    totalAmount: 0,
    resetBagSummery: () => {
        bagSummery.totalAmount = 0;
        bagSummery.totalMrp = 0;
        bagSummery.convenienceFee = 0;
        bagSummery.discountOnMRP = 0;
    },
}
onLoad();

function onLoad() {
    loadBagItemObjects();
    calculateBagSummary()
    displayItemsOnHomePage()
}

function loadBagItemObjects() {
    bagItemsObject.push(...bagItems.map(
            bagItem => {
                let item = items.find(item => item.id === bagItem.itemId)
                item.quantity = bagItem.count;
                return item;
            }
        )
    )
}

function displayItemsOnHomePage() {
    const itemsContainerElement = document.getElementById('bag-items-container');
    itemsContainerElement.innerHTML = '';
    bagItemsObject.forEach(bagItem => itemsContainerElement.appendChild(generateInnerHtmlFormItem(bagItem)));
    updateBagSummaryAtDom();
}

function generateInnerHtmlFormItem(bagItem) {
    const element = document.createElement('div');
    element.className = "bag-item-container";
    element.innerHTML = `
                <div class="item-left-part">
                    <img class="bag-item-img" src="../${bagItem.image}" alt="">
                </div>
                <div class="item-right-part">
                    <div class="company">${bagItem.company}</div>
                    <div class="item-name">${bagItem.item_name}</div>
                    <div><b> Quantity:</b> ${bagItem.quantity} </div>
                    <div class="price-container">
                        <span class="current-price">Rs ${bagItem.quantity * bagItem.current_price}</span>
                        <span class="original-price">Rs ${bagItem.quantity * bagItem.original_price}</span>
                        <span class="discount-percentage">(${bagItem.discount_percentage}% OFF)</span>
                    </div>
                    <div class="return-period">
                        <span class="return-period-days">${bagItem.return_period} days</span> return available
                    </div>
                    <div class="delivery-details">
                        Delivery by
                        <span class="delivery-details-days">${bagItem.delivery_date}</span>
                    </div>
                </div>`
    const removeCartElement = document.createElement('div');
    removeCartElement.innerText = "X";
    removeCartElement.className = 'remove-from-cart';
    removeCartElement.addEventListener("click", ev => removeFromCart(bagItem.id))
    element.appendChild(removeCartElement);
    return element;
}

function calculateBagSummary() {
    bagSummery.resetBagSummery();
    bagItemsObject.forEach(value => {
        bagSummery.totalMrp += value.original_price * value.quantity;
        bagSummery.totalAmount += value.current_price * value.quantity;
        bagSummery.discountOnMRP = bagSummery.totalMrp - bagSummery.totalAmount;
    })
    if (bagSummery.totalAmount < 1000 && bagSummery.totalAmount > 0) {
        bagSummery.convenienceFee = 99;
        bagSummery.totalAmount += bagSummery.convenienceFee;
    }
}


function placeOrder() {
    alert("placing order...")
    bagItems.splice(0, bagItems.length);
    bagItemsObject.splice(0, bagItemsObject.length);
    localStorage.setItem("bag-items", '[]');
    calculateBagSummary();
    updateBagSummaryAtDom();
    displayItemsOnHomePage();
    updateBagItemCount();
}


function removeFromCart(itemId) {
    const bagItem = bagItemsObject.find(bagItem => bagItem.id === itemId)
    if (bagItem) {
        bagItem.quantity--;
        if (bagItem.quantity < 1) {
            const index = bagItemsObject.indexOf(bagItem);
            index > -1 && bagItemsObject.splice(index, 1);
        }
        removeFromBag(itemId)
        calculateBagSummary();
        updateBagSummaryAtDom();
        displayItemsOnHomePage();

    }
}

function removeFromBag(itemId) {
    if (typeof itemId === "string") {
        const bagItem = bagItems.find(value => value.itemId === itemId);
        console.log(JSON.stringify(bagItem), "index", bagItems.indexOf(bagItem))
        bagItem.count--;
        if (bagItem.count < 1) {
            const index = bagItems.indexOf(bagItem);
            console.log(index)
            if (index > -1) {
                bagItems.splice(index, 1);
            }
        }
        updateBagItemCount();
    }
}

function updateBagSummaryAtDom() {
    const bagSummary = document.getElementById('bag-summary');
    bagSummary.innerHTML = `   
            <div class="bag-details-container">
                <div class="price-header">PRICE DETAILS (${bagItemsObject.length} Items)</div>
                <div class="price-item">
                    <span class="price-item-tag">Total MRP</span>
                    <span class="price-item-value">Rs${bagSummery.totalMrp}</span>
                </div>
                <div class="price-item">
                    <span class="price-item-tag">Discount on MRP</span>
                    <span class="price-item-value priceDetail-base-discount">-Rs${bagSummery.discountOnMRP}</span>
                </div>
                <div class="price-item">
                    <span class="price-item-tag">Convenience Fee</span>
                    <span class="price-item-value">Rs ${bagSummery.convenienceFee}</span>
                </div>
                <hr>
                <div class="price-footer">
                    <span class="price-item-tag">Total Amount</span>
                    <span class="price-item-value">Rs ${bagSummery.totalAmount}</span>
                </div>
            </div>
            <button class="btn-place-order">
                <span class="css-xjhrni" onclick="placeOrder()">PLACE ORDER</span>
            </button>`
}
