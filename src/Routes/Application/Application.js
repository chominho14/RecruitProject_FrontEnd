import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { resizeState } from "../../atom";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
import ModalBasic from "../../Components/ModalBasic";

// ------------------ 뒤로가기 ----------------

const BackDiv = styled.div`
  position: absolute;
  top: 40px;
  left: 35px;
  width: 100%;
`;

const BackHr = styled.hr`
  margin-left: 0px;
  margin-right: 15%;
  border: 1px solid #ddd;
`;

const BackBtn = styled.button`
  color: black;
  border: none;
  font-size: 18px;
  line-height: 20px;
  font-weight: 500;
  width: 30px;
  height: 20px;
  cursor: pointer;
  background-color: white;
  border-color: #d9e1e8;
  border-radius: 8px;
  &:hover {
    background-color: whitesmoke;
  }
`;

// -------------------- 지원 ----------------------

const ApplyContainer = styled.div`
  margin-top: 210px;
  padding-bottom: 128px;
  padding-top: 30px;
  margin-left: auto;
  margin-right: auto;
  width: 75%;
`;

const ApplyForm = styled.form`
  width: 100%;
`;

const UploadFormImgDiv = styled.div`
  width: 100%;
  max-width: 500px;

  height: 100px;
  margin-top: 30px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
`;

const ApplyFormLabelDiv = styled.div`
  width: 100%;
  max-width: 500px;

  margin: 0 auto;
`;

const ApplyFormLabel = styled.label`
  font-size: large;
  font-weight: 400;
  width: 100%;
  margin-left: auto;
  max-width: 500px;
  color: rgba(0, 0, 0, 0.9);
`;

const ApplyFormLabelDetail = styled.div`
  font-size: 13px;
  font-weight: 600;
  padding-top: 4px;
  padding-left: 10px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 5px;
`;

const ApplyFormImgLabel = styled.label`
  width: 100%;
  height: 100%;
  font-size: 30px;
  cursor: pointer;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 6px;
  border-width: 1px;
  border-style: dashed;
  &:hover {
    border-color: rgba(43, 144, 217, 1);
    color: rgba(43, 144, 217, 1);
  }
`;

const ApplyInput = styled.input`
  margin-top: 40px;
  margin-bottom: 8px;
  -webkit-appearance: none;
  /* max-width: 400px; */
  width: 100%;
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

const ApplyBtnDiv = styled.div`
  width: 100%;
  text-align: center;
`;

const ApplyBtn = styled.button`
  color: white;
  margin-top: 32px;
  border: 1px;
  border-color: transparent;
  border-radius: 0.375rem;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  width: 100%;
  max-width: 500px;
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

// --------------- 이력서 업로드 ---------------

const ResumeImageContainer = styled.div`
  width: 100%;
  height: 100px;
  margin: 0 auto;
`;

const ResumeImageContainerDiv = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 6px;
  font-weight: 500;
  opacity: 0.5;
`;

const ResumeImageFileChangeDiv = styled.div`
  position: absolute;
  top: 340px;
  width: 85%;
  max-width: 550px;
`;

const ResumeImageFileChangeBtn = styled.button`
  float: right;
  color: white;
  border: 1px;
  border-color: transparent;
  border-radius: 0.375rem;
  font-size: 20px;
  line-height: 20px;
  font-weight: 200;
  width: 40px;
  height: 40px;

  padding: 10px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-width: 2px;
  }
`;

// --------------- 개인정보 제공 동의 --------------

const ResumePrivacyContainer = styled.div`
  display: flex;
  background-color: #d9e1e8;
  border-radius: 7px;
  width: 100%;
  max-width: 500px;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
`;

const ResumePrivacySubContainer = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 13px;
  margin-top: 3px;
`;

const ResumePrivacySubmitDiv = styled.div`
  color: rgba(0, 66, 255);
  cursor: pointer;
  &:hover {
    color: rgba(0, 0, 255);
  }
`;

function Application() {
  const navigate = useNavigate();
  // form 백엔드 데이터 전송
  const { register, handleSubmit, watch, reset } = useForm();
  const [data, setData] = useState(null);
  // 사진 첨부 시 사진 보이기

  const resume = watch("resume");

  const [resumePreview, setResumePreview] = useState("");
  useEffect(() => {
    if (resume && resume.length > 0) {
      const file = resume[0];
      setResumePreview(URL.createObjectURL(file));
    }
  }, [resume]);

  // 개인정보 동의 체크 여부
  const [privacyCheck, setPrivacyCheck] = useState(false);
  const onCheckPrivacy = () => {
    setPrivacyCheck((prev) => !prev);
  };

  // 지원 버튼 클릭시
  const { positionId } = useParams();
  const onValid = ({ resume }) => {
    if (!privacyCheck)
      return alert(
        "채용 전형 진행을 위해 개인정보 제3자 제공에 동의해 주세요."
      );
    if (resume && resume.length > 0) {
      const formData = new FormData();

      formData.append("file", resume[0]);

      // axios
      //   .post(`http://localhost:8080/api/application/${positionId}`, formData, {
      //     headers: { Authorization: localStorage.getItem("userData") },
      //   })
      //   .then((res) => {
      //     setData(res.data);
      //   });
      axios
        .post(
          process.env.REACT_APP_API_URL + `/application/${positionId}`,
          formData,
          {
            headers: { Authorization: localStorage.getItem("userData") },
          }
        )
        .then((res) => {
          setData(res.data);
        });
    }
  };

  useEffect(() => {
    if (data?.code === "ok") {
      navigate("/");
    } else {
      navigate(`/application/${positionId}`);
    }
  }, [data, navigate, positionId]);

  // 뒤로가기
  const large = useRecoilValue(resizeState);

  const handleGoback = () => {
    navigate(-1);
  };

  // 모달창
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <>
      <ApplyContainer>
        {large === "Mobile" ? (
          <BackDiv>
            <BackBtn onClick={handleGoback}>
              <IoIosArrowBack />
            </BackBtn>
            <BackHr />
          </BackDiv>
        ) : null}
        <ApplyForm onSubmit={handleSubmit(onValid)}>
          <ApplyFormLabelDiv>
            <ApplyFormLabel>
              이력서를 첨부해 주세요.
              <span style={{ color: "#ff7f00" }}>*</span>
              <ApplyFormLabelDetail>- pdf, docx, hwp 가능</ApplyFormLabelDetail>
              <ApplyFormLabelDetail>
                - 여러장은 압축하여 업로드해주세요.
              </ApplyFormLabelDetail>
            </ApplyFormLabel>
          </ApplyFormLabelDiv>
          <UploadFormImgDiv>
            {resumePreview.length === 0 || resume === undefined ? (
              <ApplyFormImgLabel>
                <BsFileEarmarkPlus />
                <ApplyInput
                  {...register("resume")}
                  type="file"
                  accept=".pdf, .docx, .hwp, .zip"
                  style={{ display: "none" }}
                />
              </ApplyFormImgLabel>
            ) : (
              <ResumeImageContainer>
                <ResumeImageContainerDiv>
                  {"첨부파일 : " + resumePreview}
                </ResumeImageContainerDiv>
                <ResumeImageFileChangeDiv>
                  <ResumeImageFileChangeBtn
                    onClick={() => {
                      reset({
                        data: "resume",
                      });
                    }}
                  >
                    <MdOutlineCancel />
                  </ResumeImageFileChangeBtn>
                </ResumeImageFileChangeDiv>
              </ResumeImageContainer>
            )}
          </UploadFormImgDiv>
          <ResumePrivacyContainer>
            <input
              type="checkbox"
              checked={privacyCheck}
              onChange={onCheckPrivacy}
            ></input>
            <ResumePrivacySubContainer>
              &nbsp;채용 전형 진행을 위해 &nbsp;
              <ResumePrivacySubmitDiv onClick={showModal}>
                개인정보 제3자 제공
              </ResumePrivacySubmitDiv>
              에 동의합니다.
              <div style={{ color: "gray" }}>&nbsp;(필수)</div>
            </ResumePrivacySubContainer>
          </ResumePrivacyContainer>

          <ApplyBtnDiv>
            <ApplyBtn>지원 버튼</ApplyBtn>
          </ApplyBtnDiv>
        </ApplyForm>
      </ApplyContainer>
      {modalOpen && <ModalBasic setModalOpen={setModalOpen} />}
    </>
  );
}

export default Application;
