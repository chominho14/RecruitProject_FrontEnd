// eslint-disable-next-line
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { resizeState } from "../atom";
import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BiUser } from "react-icons/bi";
import useUser from "../Libs/useUser";
import { BsBuilding } from "react-icons/bs";

// -----------------------웹 헤더 ------------------------

const WebNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  background-color: #d9e1e8;
  opacity: 0.7;
  z-index: 1;
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

const Item = styled.li`
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

// -----------------------모바일 헤더 ------------------------

const Hr = styled.hr`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 5rem;
  color: #8b8687;
`;

const Mobile = styled.nav`
  background-color: white;
  color: gray;
  border-top-width: 1px;
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  line-height: 1rem;
  z-index: 1;
`;

const MobileItemHome = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  color: ${(props) => (props.homeMatch ? "#2b90d9" : "gray")};
  font-size: large;
  :hover {
    color: #2b90d9;
  }
`;

const MobileItemResume = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  color: ${(props) => (props.resumeMatch ? "#2b90d9" : "gray")};
  font-size: large;
  :hover {
    color: #2b90d9;
  }
`;

const MobileItemCompanyApp = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  color: ${(props) => (props.companyAppMatch ? "#2b90d9" : "gray")};
  font-size: large;
  :hover {
    color: #2b90d9;
  }
`;

const MobileItemCompanyUpload = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  color: ${(props) => (props.companyUploadMatch ? "#2b90d9" : "gray")};
  font-size: large;
  :hover {
    color: #2b90d9;
  }
`;

const MobileItemProfile = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  color: ${(props) => (props.profileMatch ? "#2b90d9" : "gray")};
  font-size: large;
  :hover {
    color: #2b90d9;
  }
`;

const MobileSpan = styled.span`
  font-size: small;
  padding-top: 5px;
`;

function Header() {
  const resumeMatch = useMatch("/resume");
  const homeMatch = useMatch("/");
  const profileMatch = useMatch("/profile");
  const loginMatch = useMatch("/login");
  const joinMatch = useMatch("/join");
  const companyAppMatch = useMatch("/company/positionList");
  const companyUploadMatch = useMatch("/company/upload");

  // 내 이력서 페이지 일반 유저에게만 접근 가능
  const userData = useUser();

  // 반응형 헤더 만들기
  const [screen, setScreen] = useState(window.outerWidth);
  const [large, setLarge] = useRecoilState(resizeState);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.outerWidth);
    };
    window.addEventListener("resize", handleResize);
    if (screen > 680) {
      setLarge("Web");
    } else if (screen <= 680) {
      setLarge("Mobile");
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const onResumeClick = () => {
    if (userData?.code === null) {
      return alert("로그인을 해주세요.");
    }
  };

  // const navigate = useNavigate();

  // const onProfileClick = () => {
  //   if (user?.email == null) navigate("/login");
  // };

  return (
    <>
      {large === "Web" ? (
        <>
          <WebNav>
            <Col>
              <Logo />
              <Items>
                {userData?.authority !== "ROLE_COMPANY" ? (
                  <Item>
                    <Link to={"/resume"} onClick={onResumeClick}>
                      내 이력서
                      {resumeMatch?.pathname === "/resume" && (
                        <Circle layoutId="circle" />
                      )}
                    </Link>
                  </Item>
                ) : (
                  <>
                    <Item>
                      <Link to={"/company/positionList"}>
                        지원 현황
                        {companyAppMatch?.pathname ===
                          "/company/positionList" && (
                          <Circle layoutId="circle" />
                        )}
                      </Link>
                    </Item>
                    <Item>
                      <Link to={"/company/upload"}>
                        채용 업로드
                        {companyUploadMatch?.pathname === "/company/upload" && (
                          <Circle layoutId="circle" />
                        )}
                      </Link>
                    </Item>
                  </>
                )}
                <Item>
                  <Link to={"/"}>
                    채용 공고 {homeMatch && <Circle layoutId="circle" />}
                  </Link>
                </Item>
              </Items>
            </Col>
            <Col>
              <Items>
                {userData?.email != null ? (
                  <Item>
                    <Link to={"/profile"}>
                      프로필
                      {profileMatch?.pathname === "/profile" && (
                        <Circle layoutId="circle" />
                      )}
                    </Link>
                  </Item>
                ) : (
                  <>
                    <Item>
                      <Link to={"/login"}>
                        로그인
                        {loginMatch?.pathname === "/login" && (
                          <Circle layoutId="circle" />
                        )}
                      </Link>
                    </Item>
                    <Item>
                      <Link to={"/join"}>
                        회원가입
                        {joinMatch?.pathname === "/join" && (
                          <Circle layoutId="circle" />
                        )}
                      </Link>
                    </Item>
                  </>
                )}
              </Items>
            </Col>
          </WebNav>
        </>
      ) : (
        <>
          <Hr />
          {userData?.authority !== "ROLE_COMPANY" ? (
            <Mobile>
              <Link to={"/"}>
                <MobileItemHome
                  homeMatch={homeMatch?.pathname === "/" ? true : false}
                >
                  <AiOutlineHome />
                  <MobileSpan>홈</MobileSpan>
                </MobileItemHome>
              </Link>

              <Link to={"/resume"}>
                <MobileItemResume
                  resumeMatch={
                    resumeMatch?.pathname === "/resume" ? true : false
                  }
                >
                  <HiOutlineDocumentText />
                  <MobileSpan>내이력서</MobileSpan>
                </MobileItemResume>
              </Link>

              {/* <Link to={"/"}>
                <MobileItemHome
                  homeMatch={homeMatch?.pathname === "/" ? true : false}
                >
                  <BsBuilding />
                  <MobileSpan>채용공고</MobileSpan>
                </MobileItemHome>
              </Link> */}

              {/* <Link to={"/profile"} onClick={onProfileClick}> */}
              <Link to={"/profile"}>
                <MobileItemProfile
                  profileMatch={
                    profileMatch?.pathname === "/profile" ? true : false
                  }
                >
                  <BiUser />
                  <MobileSpan>프로필</MobileSpan>
                </MobileItemProfile>
              </Link>
            </Mobile>
          ) : (
            <Mobile>
              <Link to={"/"}>
                <MobileItemHome
                  homeMatch={homeMatch?.pathname === "/" ? true : false}
                >
                  <AiOutlineHome />
                  <MobileSpan>홈</MobileSpan>
                </MobileItemHome>
              </Link>

              <Link to={"/company/positionList"}>
                <MobileItemCompanyApp
                  companyAppMatch={
                    companyAppMatch?.pathname === "/company/positionList"
                      ? true
                      : false
                  }
                >
                  <HiOutlineDocumentText />
                  <MobileSpan>지원현황</MobileSpan>
                </MobileItemCompanyApp>
              </Link>

              <Link to={"/company/upload"}>
                <MobileItemCompanyUpload
                  companyUploadMatch={
                    companyUploadMatch?.pathname === "/company/upload"
                      ? true
                      : false
                  }
                >
                  <BsBuilding />
                  <MobileSpan>채용업로드</MobileSpan>
                </MobileItemCompanyUpload>
              </Link>

              {/* <Link to={"/profile"} onClick={onProfileClick}> */}
              <Link to={"/profile"}>
                <MobileItemProfile
                  profileMatch={
                    profileMatch?.pathname === "/profile" ? true : false
                  }
                >
                  <BiUser />
                  <MobileSpan>프로필</MobileSpan>
                </MobileItemProfile>
              </Link>
            </Mobile>
          )}
        </>
      )}
    </>
  );
}

export default Header;
