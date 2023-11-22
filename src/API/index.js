// Replace 'YOUR_API_BASE_URL' with the actual base URL of the BookBuddy API
const API_BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com";

// Helper function to handle JSON response
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json(); // Attempt to parse the error response
    throw new Error(
      `HTTP error! Status: ${response.status}. ${errorData.message || ""}`
    );
  }
  return response.json();
};

// Function to register a new user
const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await handleResponse(response);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
};

// Function to login a user
const loginUser = async (loginData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const result = await handleResponse(response);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
};

// ... (Other functions remain unchanged)

// Example usage
const userData = {
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@example.com",
  password: "securepassword",
};

const loginData = {
  email: "john.doe@example.com",
  password: "securepassword",
};

// Register a new user
registerUser(userData);

// Login the user
loginUser(loginData);
