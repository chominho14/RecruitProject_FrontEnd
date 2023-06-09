import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { TbPhotoPlus } from "react-icons/tb";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { resizeState } from "../../atom";
import { BiSearchAlt2 } from "react-icons/bi";

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

// ------------------ upload -----------------

const UploadContainer = styled.div`
  width: 100%;
  padding-bottom: 120px;
`;

const UploadMainForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-bottom: 3px;
`;

const UploadInput = styled.input`
  margin-top: 8px;
  margin-bottom: 8px;
  width: 100%;
  /* -webkit-appearance: none; */
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
  /* -webkit-appearance: none; */
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
  /* -webkit-appearance: none; */
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

const UploadFormImageLabel = styled.label`
  font-size: small;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.9);
  margin-bottom: 10px;
`;

// ------------------- 기술 스택 ------------------------

const SkillListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
`;

const SkillListListBtnContainer = styled.div`
  height: 100px;
`;

const SkillListListBtnUl = styled.ul``;

const SkillSearchLi = styled.li`
  float: left;
  margin: 4px;
`;

const SkillListListBtn = styled.button`
  border-radius: 8px;
  color: black;
  border-color: ${({ check }) => (check ? "#76b4e0" : "whitesmoke")};
  &:hover {
    letter-spacing: 1px;
    opacity: 0.8;
    cursor: pointer;
    border-color: ${({ check }) => (check ? "black" : "gray")};
    background-color: ${({ check }) => (check ? "#a8cfeb" : "white")};
  }

  background-color: ${({ check }) => (check ? "#a8cfeb" : "white")};
`;

const SkillSearchDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SkillSearchInput = styled.input`
  margin-top: 8px;
  margin-bottom: 8px;
  /* -webkit-appearance: none; */
  width: 100%;
  font-size: large;
  padding: 10px;
  border-width: 2px;
  border-color: rgba(139, 134, 135, 0.3);
  border-radius: 0.375rem;
  z-index: 0;
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

const SkillSearchIcon = styled.span`
  position: absolute;
  right: 12px;
  bottom: 12px;
  font-size: x-large;
  opacity: 0.5;
`;

const UploadMobileBtn = styled.button`
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
  background-color: rgba(43, 144, 217, 1);

  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-width: 2px;
  }
`;

function PositionModify() {
  // positionId
  const { positionId } = useParams();

  // position에서 넘어온 데이터들을 뿌려서 보여주기
  const location = useLocation();
  const titleProp = location.state.title;
  const salaryProp = location.state.salary;
  const endDayProp = location.state.endDay;
  const introductionProp = location.state.introduction;
  const regionProp = location.state.region;
  const fieldProp = location.state.field;
  const skilledProp = location.state.skilled;

  // 담아온 데이터들 폼에 담기기 전에 한 번 더 설정
  const [titleBasic, setTitleBasic] = useState(titleProp);
  const [salaryBasic, setsalaryBasic] = useState(salaryProp);
  const [endDayBasic, setEndDayBasic] = useState(endDayProp);
  const [introBasic, setIntroBasic] = useState(introductionProp);

  const onChangeTitle = (e) => {
    setTitleBasic(e.target.value);
  };

  const onChangeSalary = (e) => {
    setsalaryBasic(e.target.value);
  };

  const onChangeEndDay = (e) => {
    setEndDayBasic(e.target.value);
  };

  const onChangeIntro = (e) => {
    setIntroBasic(e.target.value);
  };

  // ------------------------------------

  const RegionSelected = ["SEOUL", "INCHEON", "GYEONGGI"];

  const [regionSelected, setRegionSelected] = useState("");

  const FieldSelected = [
    "백엔드",
    "프론트엔드",
    "인공지능",
    "웹프로그래머",
    "리눅스",
    "데이터분석",
    "정보보안",
  ];
  const [fieldSelected, setFieldSelected] = useState("");

  const large = useRecoilValue(resizeState);

  const handleRegionSelect = (e) => {
    setRegionSelected(e.target.value);
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
    // 기술 스택 체크 되어 있는 값들 찾아서 skill데이터에 담기
    let skillHidden = "";
    for (let i = 0; i < skillLists.length; i++) {
      if (skillLists[i].check === true) {
        if (skillHidden === "") {
          skillHidden = skillHidden + skillLists[i].text;
        } else {
          skillHidden = skillHidden + ", " + skillLists[i].text;
        }
      }
      skill = skillHidden;
    }

    if (photo && photo.length > 0) {
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
      axios
        .post(
          process.env.REACT_APP_API_URL + `/company/modify/${positionId}`,
          formData,
          {
            headers: { Authorization: localStorage.getItem("userData") },
          }
        )
        .then((res) => {
          setData(res.data);
        });
    } else {
      const formData = new FormData();
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
      axios
        .post(
          process.env.REACT_APP_API_URL + `/company/modify/${positionId}`,
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

  const loginExists = localStorage.getItem("userRoles");

  useEffect(() => {
    if (!loginExists || loginExists === "ROLE_USER") {
      alert("기업회원만 접근 가능합니다.");
      return navigate("/");
    }
    if (data?.code === "ok") {
      navigate("/");
    }
  }, [data, loginExists, navigate]);

  // 사진 첨부 시 사진 보이기
  const photo = watch("photo");
  const [photoPreview, setPhotoPreview] = useState("");
  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  }, [photo]);

  // 기술 스택 검색해서 선택할 수  있게 만들기
  const skilled = watch("searchSkill");

  const [skillLists, setSkillLists] = useState([
    { id: 1, text: "Java", check: skilledProp.includes("Java") },
    { id: 2, text: "Python", check: skilledProp.includes("Python") },
    { id: 3, text: "ReactJS", check: skilledProp.includes("ReactJS") },
    { id: 4, text: "VueJS", check: skilledProp.includes("VueJS") },
    { id: 5, text: "C++", check: skilledProp.includes("C++") },
    { id: 6, text: "C#", check: skilledProp.includes("C#") },
    { id: 7, text: "JPA", check: skilledProp.includes("JPA") },
    { id: 8, text: "SpringBoot", check: skilledProp.includes("SpringBoot") },
    { id: 9, text: "JavaScript", check: skilledProp.includes("JavaScript") },
    { id: 10, text: "etc", check: skilledProp.includes("etc") },
  ]);

  const handleSkillListBtnClick = (id) => {
    setSkillLists(
      skillLists.map((skillList) =>
        skillList.id === id
          ? { ...skillList, check: !skillList.check }
          : skillList
      )
    );
  };

  // 뒤로가기
  const navagate = useNavigate();
  const handleGoback = () => {
    navagate(-1);
  };

  return (
    <UploadContainer>
      <UploadMobileSizeBackBtnContainer>
        {large === "Mobile" ? (
          <BackDiv>
            <BackBtn onClick={handleGoback}>
              <IoIosArrowBack />
            </BackBtn>
            <BackHr />
          </BackDiv>
        ) : null}
      </UploadMobileSizeBackBtnContainer>
      <div>
        <SkillListContainer>
          <UploadFormDiv>
            <UploadFormLabel>기술 스택</UploadFormLabel>
          </UploadFormDiv>
          <UploadFormDiv>
            <div>
              <SkillSearchDiv>
                <SkillSearchInput
                  {...register("searchSkill")}
                  type="text"
                  placeholder="기술 스택 검색."
                />

                <SkillSearchIcon>
                  <BiSearchAlt2 />
                </SkillSearchIcon>
              </SkillSearchDiv>

              <SkillListListBtnContainer>
                <SkillListListBtnUl>
                  {skillLists
                    .filter((skillList) => {
                      if (skilled === "" || skilled === undefined) {
                        return skillList;
                      } else if (
                        skillList.text
                          .toLowerCase()
                          .includes(skilled.toLowerCase())
                      ) {
                        return skillList;
                      }
                      return null;
                    })
                    .map((skillList) => (
                      <SkillSearchLi key={skillList.id}>
                        <SkillListListBtn
                          onClick={() => {
                            handleSkillListBtnClick(skillList.id);
                          }}
                          check={skillList.check}
                        >
                          {skillList.text}
                        </SkillListListBtn>
                      </SkillSearchLi>
                    ))}
                </SkillListListBtnUl>
              </SkillListListBtnContainer>
            </div>
          </UploadFormDiv>
        </SkillListContainer>
        <UploadMainForm onSubmit={handleSubmit(onValid)}>
          <UploadFormDiv>
            <UploadFormImageLabel>
              사진 변경을 원하시면 새로 첨부해 주세요.
            </UploadFormImageLabel>
          </UploadFormDiv>

          <UploadFormImgDiv>
            {photoPreview.length === 0 ? (
              <UploadFormImgLabel>
                <TbPhotoPlus />
                <UploadInput
                  {...register("photo")}
                  type="file"
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
            <UploadFormLabel>
              채용공고 제목 <span style={{ color: "#ff7f00" }}>*</span>
            </UploadFormLabel>
            <div>
              <UploadInput
                {...register("title", { required: true })}
                type="text"
                value={titleBasic}
                onChange={onChangeTitle}
                placeholder="제목을 입려해주세요."
              />
            </div>
          </UploadFormDiv>

          <UploadFormDiv>
            <UploadFormLabel>연봉</UploadFormLabel>
            <div>
              <UploadInput
                {...register("salary")}
                value={salaryBasic}
                onChange={onChangeSalary}
                type="text"
                placeholder="연봉을 입력해주세요."
              />
            </div>
          </UploadFormDiv>

          <UploadFormDiv>
            <UploadFormLabel>채용공고 마감일</UploadFormLabel>
            <div>
              <UploadInput
                {...register("endDay")}
                value={endDayBasic}
                onChange={onChangeEndDay}
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
                value={introBasic}
                onChange={onChangeIntro}
                rows={10}
                type="text"
                placeholder="채용공고 소개를 입력해주세요."
              />
            </div>
          </UploadFormDiv>

          <UploadFormDiv>
            <UploadFormLabel>
              지역 <span style={{ color: "#ff7f00" }}>*</span>
            </UploadFormLabel>
            <div>
              <UploadFormSelect
                {...register("region", { required: true })}
                onChange={handleRegionSelect}
                defaultValue={regionProp}
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
            <UploadFormLabel>
              채용공고 분야 <span style={{ color: "#ff7f00" }}>*</span>
            </UploadFormLabel>
            <div>
              <UploadFormSelect
                {...register("field", { required: true })}
                onChange={handleFieldSelect}
                defaultValue={fieldProp}
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
            {large === "Mobile" ? (
              <UploadMobileBtn>{"수정하기"}</UploadMobileBtn>
            ) : (
              <UploadBtn>{"수정하기"}</UploadBtn>
            )}
          </UploadFormDiv>
        </UploadMainForm>
      </div>
    </UploadContainer>
  );
}

export default PositionModify;
