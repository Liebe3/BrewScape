document.getElementById("signup-form").addEventListener("submit", function(event) {
  event.preventDefault();

  console.log("Form submitted!");

  // Get form values
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const location = document.getElementById("location").value;
  const birthday = document.getElementById("birthday").value;
  const gender = document.getElementById("gender").value;

  // Basic Validation
  if (!firstName || !lastName || !email || !phone || !password || !location || !birthday || !gender) {
    alert("Please fill in all fields.");
    return;
  }

  // Generate a unique ID for the new user
  const userId = Date.now(); // Using timestamp as a simple unique ID

  // Create user data object
  const userData = {
    id: userId,
    firstName,
    lastName,
    email,
    phone,
    password, // Note: Do NOT store passwords like this in production apps
    location,
    birthday,
    gender
  };

  // Retrieve existing users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Add new user to the array
  users.push(userData);

  // Store updated users array back to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully!");

  // Redirect to home or login page
  window.location.href = "login.html";
});
