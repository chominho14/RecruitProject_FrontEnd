import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PositionApplyListContainer = styled.div`
  height: 70px;
  border: 1px solid #ddd;
  margin: 10px auto;
  /* margin-left: auto;
  margin-right: auto; */
  border-radius: 8px;
  background-color: rgba(224, 224, 224, 0.5);
  padding: 10px 18px;
  max-width: 500px;
  width: 100%;
  display: flex;
`;

const PositionApplyListNameIdContainer = styled.div`
  width: 30%;
`;

const PositionApplyListNameDiv = styled.div`
  font-weight: 400;
  font-size: 15px;
`;

const PositionApplyListStudentNumDiv = styled.div`
  color: gray;
  font-weight: 400;
  font-size: 13px;
  padding-top: 5px;
`;

const PositionApplyListResumeDiv = styled.div`
  width: 70%;
`;

function PositionApplyList({ id, name, studentId, resumeName }) {
  // const downloadResume = async (filename) => {
  //   const url =
  //     "http://localhost:8080/api/company/resume/download?filename=" + filename;
  //   const download = document.createElement("a");

  //   download.href = url;
  //   download.setAttribute("download", filename);
  //   download.setAttribute("type", "application/json");
  //   download.click();
  // };

  const [data, setData] = useState(null);

  const downloadResumeClick = (resumeName) => {
    console.log(resumeName);

    if (resumeName) {
      axios
        .get(`http://localhost:8080/api/company/resume`, {
          params: { filename: resumeName },
        })
        .then((res) => {
          setData(res.data);
        });
    } else {
      return alert("올바른 파일이 아닙니다.");
    }
  };

  console.log(data);

  return (
    <div>
      <PositionApplyListContainer key={id}>
        <PositionApplyListNameIdContainer>
          <PositionApplyListNameDiv>{name}</PositionApplyListNameDiv>
          <PositionApplyListStudentNumDiv>
            {studentId}
          </PositionApplyListStudentNumDiv>
        </PositionApplyListNameIdContainer>
        <PositionApplyListResumeDiv>
          <button onClick={() => downloadResumeClick(resumeName)}>
            다운로드
          </button>
        </PositionApplyListResumeDiv>
      </PositionApplyListContainer>
    </div>
  );
}

export default PositionApplyList;
