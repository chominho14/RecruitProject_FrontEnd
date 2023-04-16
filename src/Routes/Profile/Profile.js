import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useUser from "../../Libs/useUser";

const ProfileContainer = styled.div`
  margin-top: 30px;
  padding-left: 16px;
  padding-bottom: 128px;
  padding-top: 30px;
  padding-right: 16px;
`;

const ProfileMainForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
`;

const ProfileBtn = styled.button`
  color: white;
  margin-top: 32px;
  border: 1px;
  border-color: transparent;
  border-radius: 0.375rem;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  width: 60%;
  max-width: 400px;
  padding: 12px;
  cursor: pointer;
  background-color: rgba(43, 144, 217, 0.5);
  &:hover {
    background-color: rgba(43, 144, 217, 1);
  }
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-width: 2px;
  }
`;

function Profile() {
  const navigate = useNavigate();
  const user = useUser();
  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userRoles");
    navigate("/login");
  };
  if (user?.email == null) {
    navigate("/login");
  }
  return (
    <ProfileContainer>
      <Outlet />

      <ProfileMainForm>
        <ProfileBtn onClick={handleLogout}>{"로그아웃"}</ProfileBtn>
      </ProfileMainForm>
    </ProfileContainer>
  );
}

export default Profile;
