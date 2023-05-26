import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useMutations from "../../Libs/useMutations";

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

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [login, { loading, data }] = useMutations("/login");

  const onValid = (data) => {
    if (loading) return;
    login({ ...data });
  };

  useEffect(() => {
    if (data?.code === "ok") {
      localStorage.setItem("userData", data.email);
      localStorage.setItem("userRoles", data.authority);
      navigate("/");
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <LoginContainer>
      <LoginTitle>로그인</LoginTitle>
      <LoginSub>
        <LoginSubTitleContainer>
          <LoginSubTitle>채용 웹사이트 로그인하기</LoginSubTitle>
        </LoginSubTitleContainer>
      </LoginSub>
      <LoginMainForm onSubmit={handleSubmit(onValid)}>
        <ErrorMessageSpan>{data?.message}</ErrorMessageSpan>
        <LoginInput
          {...register("email", { required: true })}
          required
          name="email"
          type="email"
          placeholder="이메일"
        />
        <LoginInput
          {...register("password", { required: true })}
          required
          name="password"
          type="password"
          placeholder="비밀번호"
        />
        <LoginBtn>{loading ? "로딩 중..." : "로그인"}</LoginBtn>
      </LoginMainForm>
      <AnotherPageContainer>
        <AnotherPageSubContainer>
          <AnotherPageHr />

          <AnotherPageOr>
            <AnoyherPageOrSpan>또는</AnoyherPageOrSpan>
          </AnotherPageOr>
        </AnotherPageSubContainer>
        <AnotherPageGoDiv>
          <AnotherPageGoSpan>계정이 없으신가요?</AnotherPageGoSpan>
          <Link
            to={"/join"}
            style={{
              backgroundColor: "white",
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              textDecorationLine: "underline",
              textUnderlineOffset: "1px",
            }}
          >
            회원가입
          </Link>
        </AnotherPageGoDiv>
        <AnotherPageGoDiv>
          <AnotherPageGoSpan>기업회원이신가요?</AnotherPageGoSpan>
          <Link
            to={"/company/companyjoin"}
            style={{
              backgroundColor: "white",
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              textDecorationLine: "underline",
              textUnderlineOffset: "1px",
            }}
          >
            기업회원가입
          </Link>
        </AnotherPageGoDiv>
      </AnotherPageContainer>
    </LoginContainer>
  );
}

export default Login;
