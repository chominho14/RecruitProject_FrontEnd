import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useUser() {
  const [user, setUser] = useState();
  //   const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:8080/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("userData"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        console.log(data);
      });
  }, [location]);

  return user;
}
