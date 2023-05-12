import styled from "styled-components";
import { FiDownload } from "react-icons/fi";

const PositionApplyListContainer = styled.div`
  height: 70px;
  border: 1px solid #ddd;
  margin: 10px auto;
  /* margin-left: auto;
  margin-right: auto; */
  border-radius: 8px;
  padding: 10px 18px;
  max-width: 500px;
  width: 100%;
  display: flex;
`;

const PositionApplyListNameIdContainer = styled.div`
  width: 30%;
  padding-top: 5px;
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
  padding-top: 3px;
`;

const PositionApplyListResumeDownDiv = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  font-size: 20px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding-top: 7px;
  background: whitesmoke;
  float: right;
  &:hover {
    background-color: rgba(43, 144, 217, 0.2);
    border: 1px solid;
    border-color: rgba(43, 144, 217, 0.7);
  }
`;

function PositionApplyList({ id, name, studentId, resumeName }) {
  const downloadResumeClick = (resumeName) => {
    if (resumeName) {
      const url =
        "http://localhost:8080/api/company/resume?filename=" + resumeName;
      const download = document.createElement("a");

      download.href = url;
      download.setAttribute("download", resumeName);
      download.setAttribute("type", "application/json");
      download.click();
    }
  };

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
          <PositionApplyListResumeDownDiv
            onClick={() => downloadResumeClick(resumeName)}
          >
            <FiDownload />
          </PositionApplyListResumeDownDiv>
        </PositionApplyListResumeDiv>
      </PositionApplyListContainer>
    </div>
  );
}

export default PositionApplyList;
