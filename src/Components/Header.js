import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  background-color: #d9e1e8;
`;

const Logo = styled.div`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: #2b90d9;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Itme = styled.li`
  margin-right: 20px;
  color: black;
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: medium;
  font-weight: bold;
  &:hover {
    color: #282c37;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -8px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #2b90d9;
`;

function Header() {
  const loginAndProfile = false;
  const resumeMatch = useMatch("/resume");
  const homeMatch = useMatch("/");
  console.log(resumeMatch, homeMatch);

  // const navigate = useNavigate();

  // const onProfileClick = () => {
  //   navigate("/profile");
  // };
  return (
    <Nav>
      <Col>
        <Logo />
        <Items>
          <Itme>
            <Link to={"/resume"}>
              내 이력서{" "}
              {resumeMatch?.pathname === "/resume" && (
                <Circle layoutId="circle" />
              )}
            </Link>
          </Itme>
          <Itme>
            <Link to={"/"}>
              채용 공고 {homeMatch && <Circle layoutId="circle" />}
            </Link>
          </Itme>
        </Items>
      </Col>
      <Col>
        <Items>
          {loginAndProfile ? (
            <Itme>
              <Link to={"/profile"}>프로필</Link>
            </Itme>
          ) : (
            <>
              <Itme>
                <Link to={"/login"}>로그인</Link>
              </Itme>
              <Itme>
                <Link to={"/join"}>회원가입</Link>
              </Itme>
            </>
          )}
        </Items>
      </Col>

      {/* <li>
        <button onClick={onProfileClick}>Profile</button>
      </li> */}
    </Nav>
  );
}

export default Header;
