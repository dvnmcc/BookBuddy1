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
    console.log(result);
  } catch (error) {
    console.error(error.message);
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
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
};

const getUserDetails = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/details`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const result = await handleResponse(response);
    return result;
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    throw error;
  }
};

export { registerUser, loginUser, getUserDetails };
