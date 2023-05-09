import styled from "styled-components";
import CompanyApplyList from "../../Components/CompanyApplyList";
import { useQuery } from "@tanstack/react-query";
import { fetchPositionList } from "../../Libs/api";
import { useRecoilValue } from "recoil";
import { resizeState } from "../../atom";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Loading from "../../Components/Loading";

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

const ApplyContainer = styled.div`
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

function ApplyList() {
  const large = useRecoilValue(resizeState);

  const { isLoading, data: positionListData } = useQuery(
    ["positionListData"],
    () => fetchPositionList()
  );

  // 뒤로가기
  const navagate = useNavigate();
  const handleGoback = () => {
    navagate(-1);
  };

  console.log(positionListData);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ApplyContainer>
          {large === "Mobile" ? (
            <BackDiv>
              <BackBtn onClick={handleGoback}>
                <IoIosArrowBack />
              </BackBtn>
              <BackHr />
            </BackDiv>
          ) : null}

          <ApplySubContainer>
            <ApplyTitle>
              {positionListData.data
                ? positionListData.data[0].company.companyName
                : "우리 기업"}
              의 포지션
            </ApplyTitle>
            <ApplyPositionContainer>
              {positionListData.data.map((positionData) => (
                <CompanyApplyList
                  key={positionData.id}
                  id={positionData.id}
                  positionName={positionData.positionTitle}
                  skill={positionData.skilled}
                />
              ))}
            </ApplyPositionContainer>
          </ApplySubContainer>
        </ApplyContainer>
      )}
    </>
  );
}

export default ApplyList;
