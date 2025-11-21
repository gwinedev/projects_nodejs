const API = "http://localhost:3001/api";

// show backend response
function showOutput(id, data) {
  document.getElementById(id).textContent =
    typeof data === "string" ? data : JSON.stringify(data, null, 2);
}

// signup function
async function signupUser(fullname, username, password, email, bio) {
  const res = await fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullname, username, password, email, bio }),
    credentials: "include",
  });
  return res.json();
}
