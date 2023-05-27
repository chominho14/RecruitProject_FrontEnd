import { useState } from "react";

// 백엔드로 POST 타입으로 요청 시 json 형식으로 데이터를 주고 받는 라이브러리
// function useMutations(url) {
//   const [state, setState] = useState({
//     loading: false,
//     data: undefined,
//     error: undefined,
//   });

//   function mutation(data) {
//     setState((prev) => ({ ...prev, loading: true }));

//     fetch("http://localhost:8080/api" + url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((res) => res.json().catch(() => {}))
//       .then((data) => setState((prev) => ({ ...prev, data })))
//       .catch((error) => setState((prev) => ({ ...prev, error })))
//       .finally(() => setState((prev) => ({ ...prev, loading: false })));
//   }
//   return [mutation, { ...state }];
// }

function useMutations(url) {
  const [state, setState] = useState({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(data) {
    setState((prev) => ({ ...prev, loading: true }));

    fetch(process.env.REACT_APP_API_URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, { ...state }];
}

export default useMutations;
