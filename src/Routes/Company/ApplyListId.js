import styled from "styled-components";
import CompanyApplyList from "../../Components/CompanyApplyList";
import { useQuery } from "@tanstack/react-query";
import { fetchPositionList, fetchResumeList } from "../../Libs/api";
import { useRecoilValue } from "recoil";
import { resizeState } from "../../atom";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Loading from "../../Components/Loading";
import { useParams } from "react-router-dom";
import PositionApplyList from "../../Components/PositionApplyList";

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

const ApplyListContainer = styled.div`
  width: 100%;
  padding-top: 150px;
  padding-bottom: 100px;
`;

const ApplySubContainer = styled.div`
  width: 60%;
  margin: 0 auto;
`;

const ApplyTitle = styled.div`
  width: 100%;
  font-weight: 500;
  font-size: x-large;
  max-width: 500px;
  margin: auto;
`;

const ApplyPositionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

function ApplyListId() {
  const large = useRecoilValue(resizeState);
  const { positionId } = useParams();
  console.log(positionId);

  const { data: resumeListData, isLoading } = useQuery(
    ["alllResume", positionId],
    () => fetchResumeList(positionId)
  );

  console.log(resumeListData);

  // 뒤로가기
  const navagate = useNavigate();
  const handleGoback = () => {
    navagate(-1);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ApplyListContainer>
          {large === "Mobile" ? (
            <BackDiv>
              <BackBtn onClick={handleGoback}>
                <IoIosArrowBack />
              </BackBtn>
              <BackHr />
            </BackDiv>
          ) : null}

          <ApplySubContainer>
            <ApplyTitle>{"채용"}에 지원한 사람들이에요.</ApplyTitle>
            <ApplyPositionContainer>
              {resumeListData?.data.map((resumeData) => (
                <PositionApplyList
                  id={resumeData.id}
                  key={resumeData.id}
                  resumeName={resumeData.resume}
                  name={resumeData.member.username}
                  studentId={resumeData.member.studentId}
                />
              ))}
            </ApplyPositionContainer>
          </ApplySubContainer>
        </ApplyListContainer>
      )}
    </>
  );
}

export default ApplyListId;
