export async function fetchUsers() {
  return fetch("http://localhost:8080/api/users").then((res) => res.json());
}

export async function fetchHomePositions() {
  return fetch("http://localhost:8080/api/home").then((res) => res.json());
}
