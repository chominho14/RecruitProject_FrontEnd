import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useMutations from "../../Libs/useMutations";
import { resizeState } from "../../atom";
import { useRecoilValue } from "recoil";

const CompanyJoinContainer = styled.div`
  margin-top: 50px;
  padding-left: 16px;
  padding-bottom: 128px;
  padding-top: 30px;
  padding-right: 16px;
`;

const CompanyJoinTitle = styled.h3`
  font-size: 1.875rem /* 30px */;
  margin-top: 20px;
  line-height: 3.25rem /* 36px */;
  font-weight: 700;
  text-align: center;
`;

const CompanyJoinSub = styled.div`
  margin-top: 10px;
`;

const CompanyJoinSubTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CompanyJoinSubTitle = styled.h5`
  font-size: small;
  color: #9baec8;
  font-weight: 500;
  padding-bottom: 20px;
`;

const CompanyJoinMainForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
`;

const CompanyJoinInput = styled.input`
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

const CompanyJoinBtn = styled.button`
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

const CompanyMobileJoinBtn = styled.button`
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

const CompanyAnotherPageContainer = styled.div`
  margin-top: 32px;
`;

const CompanyAnotherPageSubContainer = styled.div`
  margin-top: 32px;
`;

const CompanyAnotherPageHr = styled.hr`
  width: 60%;
  max-width: 400px;
`;

const CompanyAnotherPageOr = styled.div`
  top: -17px;
  text-align: center;
`;

const CompanyAnoyherPageOrSpan = styled.span`
  background-color: white;
  padding-left: 8px;
  padding-right: 8px;
  font-size: 14px;
  line-height: 20px;
  color: gray;
`;

const CompanyAnotherPageGoDiv = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const CompanyAnotherPageGoSpan = styled.span`
  background-color: white;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: gray;
`;

const CompanyErrorMessageSpan = styled.span`
  color: red;
  font-size: large;
  font-weight: 400;
  border-width: 1px;
  border-color: red;
`;

function CompanyJoin() {
  const { register, handleSubmit } = useForm();
  const [join, { loading, data }] = useMutations("/company/companyjoin");
  const navigate = useNavigate();
  const large = useRecoilValue(resizeState);

  const onValid = (data) => {
    if (loading) return;
    join({ ...data });
  };
  const loginExist = localStorage.getItem("userData");
  useEffect(() => {
    if (loginExist) {
      alert("이미 로그인 되어있습니다.");
      return navigate("/");
    }
    if (data?.code === "ok") {
      navigate("/profile");
    } else {
      navigate("/company/companyjoin");
    }
  }, [data, loginExist, navigate]);

  return (
    <CompanyJoinContainer>
      <CompanyJoinTitle>기업회원 회원가입</CompanyJoinTitle>
      <CompanyJoinSub>
        <CompanyJoinSubTitleContainer>
          <CompanyJoinSubTitle>
            채용 웹사이트 기업 회원가입하기
          </CompanyJoinSubTitle>
        </CompanyJoinSubTitleContainer>
      </CompanyJoinSub>
      <CompanyJoinMainForm onSubmit={handleSubmit(onValid)}>
        <CompanyErrorMessageSpan>{data?.message}</CompanyErrorMessageSpan>
        <CompanyJoinInput
          {...register("email")}
          required
          name="email"
          type="email"
          placeholder="이메일"
        />

        <CompanyJoinInput
          {...register("password")}
          required
          name="password"
          type="password"
          placeholder="비밀번호"
        />
        <CompanyJoinInput
          {...register("password2")}
          required
          name="password2"
          type="password"
          placeholder="비밀번호 확인"
        />
        <CompanyAnotherPageHr />
        <CompanyAnoyherPageOrSpan>기업 정보 입력하기</CompanyAnoyherPageOrSpan>

        <CompanyJoinInput
          {...register("companyName")}
          required
          name="companyName"
          type="text"
          placeholder="기업명"
        />

        <CompanyJoinInput
          {...register("companyInfo")}
          required
          name="companyInfo"
          type="text"
          placeholder="기업 정보"
        />

        <CompanyJoinInput
          {...register("companyHomepage")}
          required
          name="companyHomepage"
          type="text"
          placeholder="기업 홈페이지주소"
        />

        <CompanyJoinInput
          {...register("companyAddress")}
          required
          name="companyAddress"
          type="text"
          placeholder="기업 주소"
        />

        <CompanyJoinInput
          {...register("companyEmpNum")}
          required
          name="companyEmpNum"
          type="text"
          placeholder="기업 인원"
        />

        <CompanyJoinInput
          {...register("companyIndustry")}
          required
          name="companyIndustry"
          type="text"
          placeholder="기업 분야"
        />

        {large === "Mobile" ? (
          <CompanyMobileJoinBtn>
            {loading ? "로딩 중..." : "회원가입"}
          </CompanyMobileJoinBtn>
        ) : (
          <CompanyJoinBtn>{loading ? "로딩 중..." : "회원가입"}</CompanyJoinBtn>
        )}
      </CompanyJoinMainForm>
      <CompanyAnotherPageContainer>
        <CompanyAnotherPageSubContainer>
          <CompanyAnotherPageHr />

          <CompanyAnotherPageOr>
            <CompanyAnoyherPageOrSpan>또는</CompanyAnoyherPageOrSpan>
          </CompanyAnotherPageOr>
        </CompanyAnotherPageSubContainer>
        <CompanyAnotherPageGoDiv>
          <CompanyAnotherPageGoSpan>
            계정이 있으신가요?
          </CompanyAnotherPageGoSpan>
          <Link
            to={"/login"}
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
            로그인
          </Link>
        </CompanyAnotherPageGoDiv>
      </CompanyAnotherPageContainer>
    </CompanyJoinContainer>
  );
}

export default CompanyJoin;
