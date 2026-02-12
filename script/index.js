onLoad();


function onLoad() {
     let bagItemStr = localStorage.getItem('bagItems');
     bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];
     displayItemOnHomePage();
     displayMens();
     displayWomens();
     displayKids();
     displayEssential();
     displayBeauty();
     displayBagIcon();
     displayBagSummary();
     
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
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>
     `;
}

function addToBag(itemId) {
     bagItems.push(itemId);
     localStorage.setItem('bagItems', JSON.stringify(bagItems));
     displayBagIcon();
}

function displayBagIcon() {
     let bagItemElement = document.querySelector('.bag-item-count');
     if (bagItems.length > 0) {
          bagItemElement.style.visibility = 'visible';
          bagItemElement.innerText = bagItems.length;
     } else {
          bagItemElement.style.visibility = 'hidden';
     }
}

function displayItemOnHomePage() {
     let itemFolder = document.querySelector('.items-container');
     if (!itemFolder) {
          return;
     }


     let innerHtml = '';
     items.forEach(item => {
          innerHtml += `
     <div class="item-container">
               <img class="item-image" src="${item.image}"
               alt="item-image">
               <div class="rating">
                   ${item.rating.stars} ⭐ | ${item.rating.count}
               </div>
               <div class="company-name">${item.company}</div>
               <div class="item-name">${item.item_name}</div>
               <div class="price">
                    <span class="current-price">${item.current_price}</span>
                    <span class="original-price">${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}% OFF)</span>
               </div>
               <button class="bag" onclick="addToBag('${item.id}')">Add to Bag</button>
          </div>`
     })


     itemFolder.innerHTML = innerHtml;
}

function displayMens(){
     let itemFolder = document.querySelector('.mens-container');
     if(!itemFolder){
          return;
     }

      let innerHtml = '';
     mensitems.forEach(item => {
          innerHtml += `
     <div class="item-container">
               <img class="item-image" src="${item.image}"
               alt="item-image">
               <div class="rating">
                   ${item.rating.stars} ⭐ | ${item.rating.count}
               </div>
               <div class="company-name">${item.company}</div>
               <div class="item-name">${item.item_name}</div>
               <div class="price">
                    <span class="current-price">${item.current_price}</span>
                    <span class="original-price">${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}% OFF)</span>
               </div>
               <button class="bag" onclick="addToBag('${item.id}')">Add to Bag</button>
          </div>`
     })

     itemFolder.innerHTML  = innerHtml;

}

function displayWomens(){
     let itemFolder = document.querySelector('.womens-container');
     if(!itemFolder){
          return;
     }

      let innerHtml = '';

     womensitems.forEach(item => {
          innerHtml += `
     <div class="item-container">
               <img class="item-image" src="${item.image}"
               alt="item-image">
               <div class="rating">
                   ${item.rating.stars} ⭐ | ${item.rating.count}
               </div>
               <div class="company-name">${item.company}</div>
               <div class="item-name">${item.item_name}</div>
               <div class="price">
                    <span class="current-price">${item.current_price}</span>
                    <span class="original-price">${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}% OFF)</span>
               </div>
               <button class="bag" onclick="addToBag('${item.id}')">Add to Bag</button>
          </div>`
     })

     itemFolder.innerHTML  = innerHtml;

}


function displayKids(){
     let itemFolder = document.querySelector('.kids-container');
     if(!itemFolder){
          return;
     }

     let innerHtml = '';

     kidsitems.forEach(item => {
          innerHtml += `
     <div class="item-container">
               <img class="item-image" src="${item.image}"
               alt="item-image">
               <div class="rating">
                   ${item.rating.stars} ⭐ | ${item.rating.count}
               </div>
               <div class="company-name">${item.company}</div>
               <div class="item-name">${item.item_name}</div>
               <div class="price">
                    <span class="current-price">${item.current_price}</span>
                    <span class="original-price">${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}% OFF)</span>
               </div>
               <button class="bag" onclick="addToBag('${item.id}')">Add to Bag</button>
          </div>`
     })

     itemFolder.innerHTML  = innerHtml;

}



function displayEssential(){
     let itemFolder = document.querySelector('.essential-container');
     if(!itemFolder){
          return;
     }

     let innerHtml = '';

     essentialitems.forEach(item => {
          innerHtml += `
     <div class="item-container">
               <img class="item-image" src="${item.image}"
               alt="item-image">
               <div class="rating">
                   ${item.rating.stars} ⭐ | ${item.rating.count}
               </div>
               <div class="company-name">${item.company}</div>
               <div class="item-name">${item.item_name}</div>
               <div class="price">
                    <span class="current-price">${item.current_price}</span>
                    <span class="original-price">${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}% OFF)</span>
               </div>
               <button class="bag" onclick="addToBag('${item.id}')">Add to Bag</button>
          </div>`
     })

     itemFolder.innerHTML  = innerHtml;

}


function displayBeauty(){
     let itemFolder = document.querySelector('.beauty-container');
     if(!itemFolder){
          return;
     }

     let innerHtml = '';

     beautyitems.forEach(beauty => {
          innerHtml += `
     <div class="item-container">
               <img class="item-image" src="${beauty.image}"
               alt="item-image">
               <div class="rating">
                   ${beauty.rating.stars} ⭐ | ${beauty.rating.count}
               </div>
               <div class="company-name">${beauty.company}</div>
               <div class="item-name">${beauty.item_name}</div>
               <div class="price">
                    <span class="current-price">${beauty.current_price}</span>
                    <span class="original-price">${beauty.original_price}</span>
                    <span class="discount">(${beauty.discount_percentage}% OFF)</span>
               </div>
               <button class="bag" onclick="addToBag('${beauty.id}')">Add to Bag</button>
          </div>`
     })

     itemFolder.innerHTML  = innerHtml;

}
     
          
     
          
     
          
     
          