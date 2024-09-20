document.getElementById("logout-button").addEventListener("click", function() {
  // Get the logged-in user's ID from localStorage
  const loggedInUserId = localStorage.getItem("loggedInUserId");

  // Ensure that the purchase history is NOT deleted when logging out
  if (loggedInUserId) {
      const purchaseHistory = JSON.parse(localStorage.getItem(`purchaseHistory_${loggedInUserId}`)) || [];
      // You can handle any additional logic for storing or processing the purchase history here if needed
  }

  // Clear the logged-in user data, but do not remove the purchase history
  localStorage.removeItem("loggedInUserId");

  // Redirect to the login page
  window.location.href = "login.html";
});
