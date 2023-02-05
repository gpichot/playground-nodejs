export const API_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8000";
export function fetchApiMessages(room) {
  const url = `${API_URL}/chat/${room}`;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function postApiMessage(room, text) {
  return fetch(`${API_URL}/messages/${room}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
    credentials: "include",
  });
}

export function signUp(username, password) {
  return fetch(`${API_URL}/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });
}

export function signIn(username, password) {
  return fetch(`${API_URL}/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });
}

export function signOut() {
  return fetch(`${API_URL}/sign-out`, {
    method: "DELETE",
    credentials: "include",
  });
}

export function getProfile() {
  return fetch(`${API_URL}/profile`, {
    credentials: "include",
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Failed to fetch profile");
      }
      return response.json();
    })
    .catch((error) => console.log(error));
}

export function getRooms() {
  return fetch(`${API_URL}/chat/rooms`, {
    credentials: "include",
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Failed to fetch rooms");
      }
      return response.json();
    })
    .catch((error) => console.log(error));
}
