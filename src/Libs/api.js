export async function fetchUsers() {
  return fetch("http://localhost:8080/api/users").then((res) => res.json());
}
