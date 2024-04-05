import jwt_decode from "jwt-decode";

function setToken(token) {
  localStorage.setItem("access_token", token);
}

export function getToken() {
  try {
    return localStorage.getItem("access_token");
  } catch (err) {
    return null;
  }
}

export function removeToken() {
  localStorage.removeItem("access_token");
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwt_decode(token) : null;
  } catch (err) {
    return null;
  }
}

export function isAuthenticated() {
  const token = readToken();
  return token ? true : false;
}

export async function authenticateUser(user, password) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ userName: user, password: password }),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      setToken(data.token);
      return true;
    } else {
      throw new Error(data.message || "Authentication failed");
    }
  } catch (err) {
    throw new Error("Network error: Unable to authenticate user.");
  }
}

export async function registerUser(user, password, password2) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      body: JSON.stringify({
        userName: user,
        password: password,
        password2: password2,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      return true;
    } else {
      const errorMessage = data.message || "Registration failed";
      throw new Error(errorMessage);
    }
  } catch (err) {
    throw new Error("Network error: Unable to register user.");
  }
}
