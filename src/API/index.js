const API_BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com";

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `HTTP error! Status: ${response.status}. ${errorData.message || ""}`
    );
  }
  return response.json();
};

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

    // Check if the token is present in the result
    if (!result.token) {
      throw new Error("Token not received in registration response");
    }

    return result;
  } catch (error) {
    throw new Error(`Error registering user: ${error.message}`);
  }
};

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
    console.log(result); // Log the result to inspect its structure
    return result;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const getUserDetails = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the request headers
      },
    });

    const result = await response.json();
    console.log(result);
    return result; // Assuming you want to return the user details
  } catch (error) {
    throw new Error(`Error fetching user details: ${error.message}`);
  }
};

export { registerUser, loginUser, getUserDetails };
