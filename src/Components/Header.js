import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const onProfileClick = () => {
    navigate("/profile");
  };
  return (
    <header>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <button onClick={onProfileClick}>Profile</button>
        </li>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
        <li>
          <Link to={"/join"}>Join</Link>
        </li>
        <li>
          <Link to={"/profile"}>Profile</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
