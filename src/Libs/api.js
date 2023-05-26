// 유저 데이터 가져오기
export async function fetchUsers() {
  return fetch("http://localhost:8080/api/users").then((res) => res.json());
}

// 홈화면 채용공고들 데이터 가져오기
export async function fetchHomePositions() {
  return fetch("http://localhost:8080/api/home").then((res) => res.json());
}

// 채용공고 상세 페이지 데이터 가져오기
export async function fetchPositionDetail(positionId) {
  const sessionEmail = localStorage.getItem("userData");
  return fetch(`http://localhost:8080/api/position/${positionId}`, {
    method: "GET",
    headers: {
      Authorization: sessionEmail,
    },
  }).then((res) => res.json());
}

// 기업회원 채용공고 리스트 데이터 가져오기
export async function fetchPositionList() {
  const sessionEmail = localStorage.getItem("userData");
  return fetch("http://localhost:8080/api/company/positionList", {
    method: "GET",
    headers: {
      Authorization: sessionEmail,
    },
  }).then((res) => res.json());
}

// 해당 채용공고에 지원한 데이터 가져오기
export async function fetchResumeList(positionId) {
  return fetch(`http://localhost:8080/api/company/positionList/${positionId}`, {
    method: "GET",
  }).then((res) => res.json());
}

// 유저가 저장한 채용공고 데이터 가져오기
export async function fetchSaveList() {
  const sessionEmail = localStorage.getItem("userData");
  return fetch("http://localhost:8080/api/profile/saveList", {
    method: "GET",
    headers: {
      Authorization: sessionEmail,
    },
  }).then((res) => res.json());
}

// // 유저 데이터 가져오기
// export async function fetchUsers() {
//   return fetch(process.env.DIS_URL + "/users").then((res) => res.json());
// }

// // 홈화면 채용공고들 데이터 가져오기
// export async function fetchHomePositions() {
//   return fetch(process.env.DIS_URL + "/home").then((res) => res.json());
// }

// // 채용공고 상세 페이지 데이터 가져오기
// export async function fetchPositionDetail(positionId) {
//   const sessionEmail = localStorage.getItem("userData");
//   return fetch(process.env.DIS_URL + `/position/${positionId}`, {
//     method: "GET",
//     headers: {
//       Authorization: sessionEmail,
//     },
//   }).then((res) => res.json());
// }

// // 기업회원 채용공고 리스트 데이터 가져오기
// export async function fetchPositionList() {
//   const sessionEmail = localStorage.getItem("userData");
//   return fetch(process.env.DIS_URL + "/company/positionList", {
//     method: "GET",
//     headers: {
//       Authorization: sessionEmail,
//     },
//   }).then((res) => res.json());
// }

// // 해당 채용공고에 지원한 데이터 가져오기
// export async function fetchResumeList(positionId) {
//   return fetch(process.env.DIS_URL + `/company/positionList/${positionId}`, {
//     method: "GET",
//   }).then((res) => res.json());
// }

// // 유저가 저장한 채용공고 데이터 가져오기
// export async function fetchSaveList() {
//   const sessionEmail = localStorage.getItem("userData");
//   return fetch(process.env.DIS_URL + "/profile/saveList", {
//     method: "GET",
//     headers: {
//       Authorization: sessionEmail,
//     },
//   }).then((res) => res.json());
// }
