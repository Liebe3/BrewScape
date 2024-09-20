document.addEventListener("DOMContentLoaded", function() {
    // Get the logged-in user's ID from localStorage
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    
    // Load user data from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userData = users.find(user => user.id === parseInt(loggedInUserId)) || {};

    const profileInfoContainer = document.getElementById("profile-info");
    const purchaseHistoryContainer = document.getElementById("purchase-history");

    // Display user profile information
    if (userData) {
        profileInfoContainer.innerHTML = `
            <p><strong>First Name:</strong> ${userData.firstName || 'N/A'}</p>
            <p><strong>Last Name:</strong> ${userData.lastName || 'N/A'}</p>
            <p><strong>Email:</strong> ${userData.email || 'N/A'}</p>
            <p><strong>Phone:</strong> ${userData.phone || 'N/A'}</p>
            <p><strong>Location:</strong> ${userData.location || 'N/A'}</p>
            <p><strong>Birthday:</strong> ${userData.birthday || 'N/A'}</p>
            <p><strong>Gender:</strong> ${userData.gender || 'N/A'}</p>
        `;
    } else {
        profileInfoContainer.innerHTML = "<p>No user data found.</p>";
    }

    // Load and display purchase history from localStorage based on the user
    const purchaseHistory = JSON.parse(localStorage.getItem(`purchaseHistory_${loggedInUserId}`)) || [];

    if (purchaseHistory.length > 0) {
        purchaseHistory.forEach(purchase => {
            const purchaseElement = document.createElement("div");
            purchaseElement.className = "purchase-history-entry";
            purchaseElement.innerHTML = `
                <p><strong>Purchase Date:</strong> ${purchase.date || 'N/A'}</p>
            `;

            purchase.items.forEach(item => {
                const itemElement = document.createElement("div");
                itemElement.className = "purchase-item";
                itemElement.innerHTML = `
                    <p><strong>Item:</strong> ${item.name || 'N/A'}</p>
                    <p><strong>Price:</strong> ${item.price || 'N/A'} ₱</p>
                    <p><strong>Quantity:</strong> ${item.quantity || 'N/A'}</p>
                    <p><strong>Total:</strong> ${item.price * item.quantity || 'N/A'} ₱</p>
                `;
                purchaseElement.appendChild(itemElement);
            });

            purchaseHistoryContainer.appendChild(purchaseElement);
        });
    } else {
        purchaseHistoryContainer.innerHTML = "<p>No purchase history found.</p>";
    }
});
