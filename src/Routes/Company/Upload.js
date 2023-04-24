import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { TbPhotoPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { resizeState } from "../../atom";
import useMutations from "../../Libs/useMutation";

const UploadContainer = styled.div`
  width: 100%;
  padding-bottom: 120px;
`;

const UploadMainForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
`;

const UploadFormImgDiv = styled.div`
  width: 60%;
  max-width: 500px;
  height: 192px;
`;

const UploadFormImgLabel = styled.label`
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

const UploadFormLabel = styled.label`
  font-size: small;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.9);
`;

const UploadFormDiv = styled.div`
  width: 60%;
  margin-top: 10px;
  max-width: 500px;
`;

const UploadInput = styled.input`
  margin-top: 8px;
  margin-bottom: 8px;
  -webkit-appearance: none;
  width: 100%;
  font-size: large;
  padding: 10px;
  border-width: 2px;
  border-color: rgba(139, 134, 135, 0.3);
  border-radius: 0.375rem;
  &::placeholder {
    font-size: medium;
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

const UploadFormTextarea = styled.textarea`
  margin-top: 8px;
  margin-bottom: 8px;
  -webkit-appearance: none;
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

const UploadFormSelect = styled.select`
  margin-top: 8px;
  margin-bottom: 8px;
  -webkit-appearance: none;
  width: 100%;
  font-size: small;
  padding: 10px;
  border-width: 2px;
  border-color: rgba(139, 134, 135, 0.3);
  border-radius: 0.375rem;
  color: rgba(0, 0, 0, 0.8);
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

const UploadBtn = styled.button`
  color: white;
  margin-top: 32px;
  border: 1px;
  border-color: transparent;
  border-radius: 0.375rem;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  width: 100%;
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

// ----------------- mobile size --------------------
const UploadMobileSizeBackBtnContainer = styled.div`
  height: 30px;
`;

// ------------------ Image File --------------------
const UploadImageContainer = styled.div`
  width: 100%;
  display: flex;
  height: 180px;
`;

const UploadImageContainerImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 6px;
`;

function Upload() {
  const RegionSelected = ["SEOUL", "INCHEON", "GYEONGGI"];
  const [regionSelected, setRegionSelected] = useState("");

  const SkillSelected = [
    "JAVA & Spring",
    "Python",
    "ReactJS & VueJS",
    "C++",
    "C#",
    "JavaScript",
    "SpringBoot & JPA",
  ];
  const [skillSelected, setSkillSelected] = useState("");

  const FieldSelected = ["백엔드", "프론트엔드", "인공지능"];
  const [fieldSelected, setFieldSelected] = useState("");

  const large = useRecoilValue(resizeState);

  const handleRegionSelect = (e) => {
    setRegionSelected(e.target.value);
    console.log(e.target.value);
  };

  const handleSkillSelect = (e) => {
    setSkillSelected(e.target.value);
  };

  const handleFieldSelect = (e) => {
    setFieldSelected(e.target.value);
  };

  // form 백엔드 데이터 전송
  const { register, handleSubmit, watch } = useForm();
  //   const [uploadPosition, { loading, data }] = useMutations("/company/upload");
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  // 데이터들 업로드
  const onValid = ({
    title,
    salary,
    endDay,
    introduction,
    region,
    skill,
    field,
    photo,
  }) => {
    if (photo && photo.length > 0) {
      console.log(photo[0]);

      const formData = new FormData();

      formData.append("file", photo[0]);

      const positionDto = {
        title,
        salary,
        endDay,
        introduction,
        region,
        skill,
        field,
      };

      formData.append("stringPositionDto", JSON.stringify(positionDto));
      console.log(formData);
      axios
        .post("http://localhost:8080/api/company/upload", formData, {
          headers: { Authorization: localStorage.getItem("userData") },
        })
        .then((res) => {
          setData(res.data);
        });
    }
  };
  console.log(data);

  useEffect(() => {
    if (data?.code === "ok") {
      navigate("/");
    } else {
      navigate("/company/upload");
    }
  }, [data]);

  // 사진 첨부 시 사진 보이기
  const photo = watch("photo");
  const [photoPreview, setPhotoPreview] = useState("");
  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  }, [photo]);

  return (
    <UploadContainer>
      <UploadMobileSizeBackBtnContainer>
        {large === "Mobile" ? (
          <>
            <button>
              <IoIosArrowBack />
            </button>
            <hr />
          </>
        ) : null}
      </UploadMobileSizeBackBtnContainer>
      <div>
        <UploadMainForm onSubmit={handleSubmit(onValid)}>
          <UploadFormImgDiv>
            {photoPreview.length === 0 ? (
              <UploadFormImgLabel>
                <TbPhotoPlus />
                <UploadInput
                  {...register("photo")}
                  type="file"
                  multiple
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </UploadFormImgLabel>
            ) : (
              <UploadImageContainer>
                <UploadImageContainerImg src={photoPreview} />
              </UploadImageContainer>
            )}
          </UploadFormImgDiv>
          <UploadFormDiv>
            <UploadFormLabel>채용공고 제목</UploadFormLabel>
            <div>
              <UploadInput
                {...register("title", { required: true })}
                type="text"
                placeholder="제목을 입려해주세요."
              />
            </div>
          </UploadFormDiv>

          <UploadFormDiv>
            <UploadFormLabel>연봉</UploadFormLabel>
            <div>
              <UploadInput
                {...register("salary")}
                type="number"
                placeholder="연봉을 입력해주세요."
              />
            </div>
          </UploadFormDiv>

          <UploadFormDiv>
            <UploadFormLabel>채용공고 마감일</UploadFormLabel>
            <div>
              <UploadInput
                {...register("endDay")}
                type="text"
                placeholder="채용공고 마감일을 입력해주세요."
              />
            </div>
          </UploadFormDiv>

          <UploadFormDiv>
            <UploadFormLabel>채용공고 소개</UploadFormLabel>
            <div>
              <UploadFormTextarea
                {...register("introduction")}
                rows={10}
                type="text"
                placeholder="채용공고 소개를 입력해주세요."
              />
            </div>
          </UploadFormDiv>

          <UploadFormDiv>
            <UploadFormLabel>지역</UploadFormLabel>
            <div>
              <UploadFormSelect
                onChange={handleRegionSelect}
                value={regionSelected}
                {...register("region", { required: true })}
              >
                {RegionSelected.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </UploadFormSelect>
            </div>
          </UploadFormDiv>

          <UploadFormDiv>
            <UploadFormLabel>기술 스택</UploadFormLabel>
            <div>
              <UploadFormSelect
                onChange={handleSkillSelect}
                value={skillSelected}
                {...register("skill", { required: true })}
              >
                {SkillSelected.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </UploadFormSelect>
            </div>
          </UploadFormDiv>

          <UploadFormDiv>
            <UploadFormLabel>채용공고 분야</UploadFormLabel>
            <div>
              <UploadFormSelect
                onChange={handleFieldSelect}
                value={fieldSelected}
                {...register("field", { required: true })}
              >
                {FieldSelected.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </UploadFormSelect>
            </div>
          </UploadFormDiv>
          <UploadFormDiv>
            <UploadBtn>{false ? "로딩 중..." : "업로드"}</UploadBtn>
          </UploadFormDiv>
        </UploadMainForm>
      </div>
    </UploadContainer>
  );
}

export default Upload;
