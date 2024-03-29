import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useUser from "../../Libs/useUser";
import { useRecoilValue } from "recoil";
import { resizeState } from "../../atom";
import { useEffect } from "react";

const ProfileContainer = styled.div`
  margin-top: 30px;
  padding-left: 16px;
  padding-bottom: 128px;
  padding-top: 30px;
  padding-right: 16px;
`;

const ProfileMainForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
`;

const ProfileLogoutBtn = styled.button`
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

const ProfileMobileLogoutBtn = styled.button`
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
  background-color: rgba(43, 144, 217, 1);
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-width: 2px;
  }
`;

const ProfileSavesDiv = styled.button`
  color: white;
  margin-top: 80px;
  border: 1px;
  border-color: transparent;
  border-radius: 0.375rem;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  width: 60%;
  max-width: 400px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-width: 2px;
  }
`;

const ProfileApplyDiv = styled.button`
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
  text-align: center;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-width: 2px;
  }
`;

const ProfileMobileSavesDiv = styled.button`
  color: white;
  margin-top: 80px;
  border: 1px;
  border-color: transparent;
  border-radius: 0.375rem;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  width: 60%;
  max-width: 400px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.3);

  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-width: 2px;
  }
`;

const ProfileMobileApplyDiv = styled.button`
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
  text-align: center;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.3);

  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-width: 2px;
  }
`;

function Profile() {
  const navigate = useNavigate();
  const user = useUser();
  const large = useRecoilValue(resizeState);

  const loginExists = localStorage.getItem("userRoles");

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userRoles");
    navigate("/login");
  };
  if (user?.email == null) {
    navigate("/login");
  }

  useEffect(() => {
    if (!loginExists) {
      return navigate("/login");
    }
  }, [loginExists, navigate]);

  const handleToSaves = () => {
    navigate("/profile/saves");
  };

  const handleToApply = () => {
    navigate("/profile/apply");
  };

  return (
    <ProfileContainer>
      <Outlet />
      <ProfileMainForm>
        {user?.authority === "ROLE_USER" ? (
          <>
            {large === "Mobile" ? (
              <>
                <ProfileMobileSavesDiv onClick={handleToSaves}>
                  내가 저장한 채용공고
                </ProfileMobileSavesDiv>
                <ProfileMobileApplyDiv onClick={handleToApply}>
                  내가 지원한 채용공고
                </ProfileMobileApplyDiv>
              </>
            ) : (
              <>
                <ProfileSavesDiv onClick={handleToSaves}>
                  내가 저장한 채용공고
                </ProfileSavesDiv>
                <ProfileApplyDiv onClick={handleToApply}>
                  내가 지원한 채용공고
                </ProfileApplyDiv>
              </>
            )}
          </>
        ) : null}

        {large === "Mobile" ? (
          <ProfileMobileLogoutBtn onClick={handleLogout}>
            {"로그아웃"}
          </ProfileMobileLogoutBtn>
        ) : (
          <ProfileLogoutBtn onClick={handleLogout}>
            {"로그아웃"}
          </ProfileLogoutBtn>
        )}
      </ProfileMainForm>
    </ProfileContainer>
  );
}

export default Profile;
