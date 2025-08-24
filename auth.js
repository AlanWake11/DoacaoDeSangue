
// auth.js

function saveUser(user) {
  return localStorage.setItem("hemoUser", JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem("hemoUser"));
}

function logout() {
  localStorage.removeItem("hemoUser");
  window.location.href = "login.html";
}

function isAuthenticated() {
  return !!localStorage.getItem("hemoUser");
}

function requireAuth() {
  if (!isAuthenticated()) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "login.html";
  }
}
