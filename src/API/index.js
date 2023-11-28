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
    console.log(result);
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
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user details: ${response.statusText}`);
    }

    const result = await response.json();

    const userDetails = {
      ...result,
      reservations: result.reservations || [],
    };

    return userDetails;
  } catch (error) {
    throw new Error(`Error fetching user details: ${error.message}`);
  }
};

export const getReservations = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reservations/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching reservations: ${response.statusText}`);
    }

    const result = await response.json();

    const reservations = result.reservations || [];

    return reservations;
  } catch (error) {
    throw new Error(`Error fetching reservations: ${error.message}`);
  }
};
export const returnBook = async (token, bookId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books/return/${bookId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to return the book: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Error returning the book: ${error.message}`);
  }
};

export const checkoutBook = async (token, bookId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/books/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        available: false, // Set the book as checked out
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to checkout book: ${response.statusText}`);
    }

    const userDetails = await getUserDetails(token);
    return userDetails;
  } catch (error) {
    throw new Error(`Error during checkout: ${error.message}`);
  }
};
export const returnReservation = async (token, reservationId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/reservations/${reservationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to return the book: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Error returning the book: ${error.message}`);
  }
};

export { registerUser, loginUser, getUserDetails };
