import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useGet() {
  const [positions, setPositions] = useState();
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:8080/api/home", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPositions(data);
      });
  }, [location]);

  return positions;
}
// export default function useGet() {
//   const [positions, setPositions] = useState();
//   const location = useLocation();

//   useEffect(() => {
//     fetch(process.env.DIS_URL + "/home", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setPositions(data);
//       });
//   }, [location]);

//   return positions;
// }
