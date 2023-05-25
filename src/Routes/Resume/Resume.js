import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../Libs/useUser";

function Resume() {
  const userData = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (userData?.code === null) {
      navigate("/login");
    }
  }, [userData]);
  return <div>resume</div>;
}

export default Resume;
