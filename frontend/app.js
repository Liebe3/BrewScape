// Initialize inventory with default items if empty
function initializeInventory() {
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
        // default inventory to
    if (inventory.length === 0) {
        inventory = [
            {
                id: '1',
                name: 'Iced Cappuccino',
                price: 120,
                quantity: 1,
                image: 'https://img.freepik.com/free-photo/high-view-glass-cappucino-with-coffee-beans_23-2148251687.jpg?t=st=1725734364~exp=1725737964~hmac=6f6d1360ca84f1f1508d2f56d92359691417e2c0a02c313f79cabe61e49b1787&w=360'
            },
            {
                id: '2',
                name: 'Salted Caramel Cold Brew',
                price: 120,
                quantity: 1,
                image: 'https://img.freepik.com/free-photo/lced-cocoa-with-sweet-milk-cold-chocolate-drink_1150-25303.jpg?t=st=1725734413~exp=1725738013~hmac=e42ac61d579e212835f86be5ef50007c534cc8a3f8f4a82a406a1892a94ca41b&w=360'
            },
            {
                id: '3',
                name: 'Chocolate Muffin',
                price: 150,
                quantity: 1,
                image: 'https://img.freepik.com/free-photo/view-delicious-muffin_23-2150777669.jpg?t=st=1725745186~exp=1725748786~hmac=a270393ada416c7605b0a2c1ecb9a5440a1e9a6919df31162ed57b5249007111&w=360'
            },
            {
                id: '4',
                name: 'Croissant',
                price: 100,
                quantity: 1,
                image: 'https://img.freepik.com/free-photo/high-angle-croissant-with-melted-chocolate_23-2148542532.jpg?t=st=1726196796~exp=1726200396~hmac=8219068471ec7bf1e4e81145836b2991e00f023f81f2d893d23092d39e562a93&w=360'
            },
            {
                id: '5',
                name: 'High Brew Coffee',
                price: 210,
                quantity: 50,
                image: 'https://img.freepik.com/free-photo/view-3d-coffee-cup_23-2151083733.jpg?t=st=1726197090~exp=1726200690~hmac=d0784c884fbd14055aa07779120df1a4823950c5aaa52b0ce5512232e42321c7&w=360'
            }
        ];
        localStorage.setItem('inventory', JSON.stringify(inventory));
        console.log("Inventory initialized:", inventory);
    }
}
        //search function
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
  
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);
  }

  function performSearch() {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.toLowerCase().trim();
  const menuItems = document.querySelectorAll('.menu-item');

  menuItems.forEach(item => {
    const itemName = item.dataset.name.toLowerCase();
    if (searchTerm === '' || fuzzyMatch(itemName, searchTerm)) {
      item.style.display = 'block';
      if (searchTerm === '') {
        removeHighlight(item);
      } else {
        highlightMatch(item, searchTerm);
      }
    } else {
      item.style.display = 'none';
      removeHighlight(item);
    }
  });
}
  function fuzzyMatch(str, pattern) {
    const letters = pattern.split('');
    let index = 0;
    for (let letter of letters) {
      index = str.indexOf(letter, index);
      if (index === -1) {
        return false;
      }
      index++;
    }
    return true;
  }

  function highlightMatch(item, searchTerm) {
    const itemNameElement = item.querySelector('h3');
    const itemName = itemNameElement.textContent;
    const highlightedName = itemName.replace(new RegExp(`(${searchTerm.split('').join('|')})`, 'gi'), '<span class="highlight">$1</span>');
    itemNameElement.innerHTML = highlightedName;
  }

  function removeHighlight(item) {
    const itemNameElement = item.querySelector('h3');
    itemNameElement.innerHTML = itemNameElement.textContent;
  }

// Load menu items into the page
function loadMenuItems() {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    const menuItemsContainer = document.querySelector('.menu-items');
    
    if (!menuItemsContainer) {
        console.log("Menu items container not found");
        return;
    } else {
        console.log("Menu items container found");
    }

    menuItemsContainer.innerHTML = ''; // Clear existing items
    
    inventory.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.dataset.id = item.id; // Add ID to data attributes
        menuItem.dataset.name = item.name;
        menuItem.dataset.price = item.price;
        menuItem.innerHTML = `
            <img src="${item.image || 'https://via.placeholder.com/150'}" alt="${item.name}" >
            <h3>${item.name} <span>[${item.quantity}]</span></h3>
            <p> <strong>₱</strong>${item.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
        menuItemsContainer.appendChild(menuItem);
    });
}

// Add event listeners for adding items to the cart
function setupAddToCartButtons() {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const menuItem = event.target.closest(".menu-item");
            const itemId = menuItem.dataset.id;
            const itemName = menuItem.dataset.name;
            const itemPrice = parseFloat(menuItem.dataset.price);

            // Get the logged-in user's ID from localStorage
            const loggedInUserId = localStorage.getItem("loggedInUserId");

            if (!loggedInUserId) {
                alert("You must be logged in to add items to the cart.");
                window.location.href = "login.html";
                return;
            }

            // Get the cart for the logged-in user from localStorage or create a new one
            let cart = JSON.parse(localStorage.getItem(`cart_${loggedInUserId}`)) || [];

            // Get the inventory item
            const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
            const inventoryItem = inventory.find(item => item.id === itemId);

            // Check if the item is in stock
            if (!inventoryItem || inventoryItem.quantity <= 0) {
                alert("This item is out of stock and cannot be added to the cart.");
                return;
            }

            // Add item to cart array
            const cartItem = {
                id: itemId,
                name: itemName,
                price: itemPrice,
                quantity: 1
            };

            // Check if the item is already in the cart
            const existingItemIndex = cart.findIndex(item => item.id === itemId);
            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity += 1;  // Increment the quantity if item already exists
            } else {
                cart.push(cartItem);  // Add new item to cart
            }

            // Store the updated cart in localStorage for the logged-in user
            localStorage.setItem(`cart_${loggedInUserId}`, JSON.stringify(cart));

            alert(`${itemName} added to cart!`);
        });
    });
}

// Process checkout
function processCheckout() {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    const cart = JSON.parse(localStorage.getItem(`cart_${loggedInUserId}`)) || [];

    // Check for items with zero quantity before proceeding to checkout
    const itemsWithZeroQuantity = cart.filter(item => {
        const inventoryItem = JSON.parse(localStorage.getItem('inventory')).find(i => i.id === item.id);
        return !inventoryItem || inventoryItem.quantity <= 0;
    });

    if (itemsWithZeroQuantity.length > 0) {
        alert("Your cart contains items with zero quantity. Please update the stock before proceeding to checkout.");
        console.log("Items with zero quantity:", itemsWithZeroQuantity); // For debugging
        return;
    }

    // Update inventory
    updateInventory(cart);

    // Clear the cart
    localStorage.removeItem(`cart_${loggedInUserId}`);

    // Log transaction (Implement this function as needed)
    // logTransaction(cart);

    alert("Checkout successful!");
}

// Update inventory based on the cart items
function updateInventory(cart) {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    
    cart.forEach(cartItem => {
        const inventoryItem = inventory.find(item => item.id === cartItem.id);
        if (inventoryItem) {
            inventoryItem.quantity -= cartItem.quantity;
            if (inventoryItem.quantity < 0) inventoryItem.quantity = 0; // Prevent negative quantities
        }
    });
    
    localStorage.setItem('inventory', JSON.stringify(inventory));
    console.log("Inventory updated:", inventory); // For debugging
}

// Initialize admin account if it doesn't already exist
function initializeAdminAccount() {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const adminExists = users.some(user => user.role === 'admin');

    if (!adminExists) {
        const adminUser = {
            id: 'admin',
            email: 'admin@brewscape.com',
            password: 'adminpassword', // In a real application, use a strong, hashed password
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin'
        };
        users.push(adminUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log("Admin account created: email - admin@brewscape.com, password - adminpassword");
    }
}

// Load menu items and setup cart buttons when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeInventory();
    loadMenuItems();
    setupAddToCartButtons();
    initializeAdminAccount();
    setupSearch();
});
