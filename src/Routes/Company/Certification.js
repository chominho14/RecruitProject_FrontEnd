import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useMutations from "../../Libs/useMutations";
import { useRecoilValue } from "recoil";
import { resizeState } from "../../atom";

const LoginContainer = styled.div`
  margin-top: 30px;
  padding-left: 16px;
  padding-bottom: 128px;
  padding-top: 100px;
  padding-right: 16px;
`;

const LoginTitle = styled.h3`
  font-size: 1.875rem /* 30px */;
  line-height: 2.25rem /* 36px */;
  font-weight: 700;
  text-align: center;
`;

const LoginSub = styled.div`
  margin-top: 30px;
`;

const LoginSubTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginSubTitle = styled.h5`
  font-size: small;
  color: #9baec8;
  font-weight: 500;
  padding-bottom: 20px;
`;

const LoginMainForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
`;

const LoginInput = styled.input`
  margin-top: 8px;
  margin-bottom: 8px;
  -webkit-appearance: none;
  max-width: 400px;
  width: 60%;
  font-size: large;
  padding: 10px;
  border-width: 2px;
  border-color: rgba(139, 134, 135, 0.3);
  border-radius: 0.375rem;
  &::placeholder {
    color: rgba(139, 134, 135, 0.5);
  }
  &:hover {
    border-color: rgba(43, 144, 217, 0.5);
  }
  &:active,
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-width: 2px;
    border-color: rgba(43, 144, 217, 0.5);
  }
`;

const LoginBtn = styled.button`
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

const LoginMobileBtn = styled.button`
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

const AnotherPageContainer = styled.div`
  margin-top: 32px;
`;

const AnotherPageSubContainer = styled.div`
  margin-top: 32px;
`;

const AnotherPageHr = styled.hr`
  width: 60%;
  max-width: 400px;
`;

const AnotherPageOr = styled.div`
  top: -17px;
  text-align: center;
`;

const AnoyherPageOrSpan = styled.span`
  background-color: white;
  padding-left: 8px;
  padding-right: 8px;
  font-size: 14px;
  line-height: 20px;
  color: gray;
`;

const AnotherPageGoDiv = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const AnotherPageGoSpan = styled.span`
  background-color: white;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: gray;
`;

const ErrorMessageSpan = styled.span`
  color: red;
  font-size: large;
  font-weight: 400;
  border-width: 1px;
  border-color: red;
`;

function Certification() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const large = useRecoilValue(resizeState);

  const loginExist = localStorage.getItem("userData");

  const onValid = ({ password }) => {
    console.log(password);
    if (password === "inhatc!@34") {
      navigate("/company/companyjoin");
    } else {
      alert("인증 코드를 확인해 주세요.");
      reset();
    }
  };

  useEffect(() => {
    if (loginExist) {
      alert("이미 로그인 되어있습니다.");
      return navigate("/");
    }
  }, [navigate, loginExist]);

  return (
    <LoginContainer>
      <LoginTitle>기업회원 인증</LoginTitle>
      <LoginSub>
        <LoginSubTitleContainer>
          <LoginSubTitle>인증 코드를 입력해 주세요.</LoginSubTitle>
        </LoginSubTitleContainer>
      </LoginSub>
      <LoginMainForm onSubmit={handleSubmit(onValid)}>
        <LoginInput
          {...register("password", { required: true })}
          required
          name="password"
          type="password"
          placeholder="인증 코드"
        />
        {large === "Mobile" ? (
          <LoginMobileBtn>코드 확인</LoginMobileBtn>
        ) : (
          <LoginBtn>코드 확인</LoginBtn>
        )}
      </LoginMainForm>
    </LoginContainer>
  );
}

export default Certification;
