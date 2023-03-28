import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useMutations from "../../Libs/useMutation";

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
  width: 50%;
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
  width: 50%;
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

function Login() {
  const { register, handleSubmit } = useForm();
  const [login, { loading, data }] = useMutations(
    "http://localhost:8080/api/login"
  );
  console.log(process.env.API_URL);
  const onValid = (data) => {
    if (loading) return;
    login({ ...data });
    console.log(data);
  };

  return (
    <LoginContainer>
      <LoginTitle>로그인</LoginTitle>
      <LoginSub>
        <LoginSubTitleContainer>
          <LoginSubTitle>채용 웹사이트 로그인하기</LoginSubTitle>
        </LoginSubTitleContainer>
      </LoginSub>
      <LoginMainForm onSubmit={handleSubmit(onValid)}>
        <LoginInput
          register={register("email")}
          required
          name="email"
          type="email"
          placeholder="이메일"
        />
        <LoginInput
          register={register("password")}
          required
          name="password"
          type="password"
          placeholder="비밀번호"
        />
        <LoginBtn>로그인</LoginBtn>
      </LoginMainForm>
      <div style={{ marginTop: "32px" }}>
        <div style={{ position: "relative" }}>
          <hr style={{ width: "50%", maxWidth: "400px" }} />

          <div
            style={{ position: "relative", top: "-12px", textAlign: "center" }}
          >
            <span
              style={{
                backgroundColor: "white",
                paddingLeft: "8px",
                paddingRight: "8px",
                fontSize: "14px",
                lineHeight: "20px",
                color: "gray",
              }}
            >
              또는
            </span>
          </div>
        </div>
        <div
          style={{
            position: "relative",
            bottom: "-1.25rem",
            textAlign: "center",
          }}
        >
          <span
            style={{
              backgroundColor: "white",
              paddingLeft: "0.25rem",
              paddingRight: "0.25rem",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              color: "gray",
            }}
          >
            계정이 없으신가요?
          </span>
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
        </div>
      </div>
    </LoginContainer>
  );
}

export default Login;
