let bagItems;
let bagItemObjects;

function onLoad() {
  let bagItemStr = localStorage.getItem('bagItems');
  bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];
  
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}

function loadBagItemObjects() {
  console.log('Bag Items from localStorage:', bagItems);

  if (!bagItems || bagItems.length === 0) {
    bagItemObjects = [];
    console.log('No items in bag');
    return;
  }

  const allItems = [
    ...items,
    ...mensitems,
    ...womensitems,
    ...kidsitems,
    ...essentialitems,
    ...beautyitems
  ];

  bagItemObjects = bagItems.map(itemId => {
    for (let i = 0; i < allItems.length; i++) {
      if (itemId == allItems[i].id) {
        return allItems[i];
      }
    }
    return null;
  }).filter(item => item !== null);
  
  console.log('Loaded bag item objects:', bagItemObjects);
}


function displayBagSummary() {
     let bagSummaryElement = document.querySelector('.bag-summary');

     let totalItem = bagItemObjects.length;
     let totalMRP = 0;
     let totalDiscount = 0;
    
     
    bagItemObjects.forEach(bagItem => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });

  let finalPayment = totalMRP - totalDiscount + 99;


     bagSummaryElement.innerHTML = `
      <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs 99</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">₹${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order" onclick="placeOrder()">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>
     `;
}



function displayBagItems() {
  let containerElement = document.querySelector('.bag-items-container');
  
  if (!bagItemObjects || bagItemObjects.length === 0) {
    containerElement.innerHTML = '<p style="text-align: center; padding: 20px;">Your bag is empty</p>';
    return;
  }
  
  let innerHTML = '';
  bagItemObjects.forEach(bagItem => {
    innerHTML += generateItemHTML(bagItem);
  });
  containerElement.innerHTML = innerHTML;
}

function removeFromBag(itemId){
  bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadBagItemObjects(); 
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
}

function generateItemHTML(item) {
  return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>
            <div class="remove-from-cart" onclick="removeFromBag('${item.id}')">X</div>
          </div>`;
}

// ✅ ADD THIS FUNCTION - Place Order
function placeOrder() {
  // Step 1: Check if bag is empty
  if (!bagItemObjects || bagItemObjects.length === 0) {
    alert('🛒 Your bag is empty!\n\nPlease add some items before placing an order.');
    return;
  }

  // Step 2: Calculate totals
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemObjects.forEach(item => {
    totalMRP += item.original_price;
    totalDiscount += item.original_price - item.current_price;
  });

  let convenienceFee = 99;
  let finalAmount = totalMRP - totalDiscount + convenienceFee;

  // Step 3: Show confirmation popup
  let confirmOrder = confirm(
    `🛍️ ORDER SUMMARY\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `Items: ${bagItemObjects.length}\n` +
    `Total MRP: ₹${totalMRP}\n` +
    `Discount: -₹${totalDiscount}\n` +
    `Convenience Fee: ₹${convenienceFee}\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `Final Amount: ₹${finalAmount}\n\n` +
    `Do you want to place the order?`
  );

  // Step 4: If user confirms
  if (confirmOrder) {
    // Show success message
    alert(
      '🎉 ORDER PLACED SUCCESSFULLY!\n\n' +
      `Order Total: ₹${finalAmount}\n\n` +
      'Thank you for shopping with Myntra! 💖\n' +
      'Your order will be delivered soon.'
    );

    // Step 5: Clear the cart
    localStorage.removeItem('bagItems');
    bagItems = [];
    bagItemObjects = [];

    // Step 6: Update the UI
    displayBagIcon();
    displayBagItems();
    displayBagSummary();
  }
}

// Start the app
onLoad();