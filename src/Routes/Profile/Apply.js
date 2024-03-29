import { useQuery } from "@tanstack/react-query";
import { IoIosArrowBack } from "react-icons/io";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { resizeState } from "../../atom";
import Loading from "../../Components/Loading";
import PositionItem from "../../Components/Position-item";
import PositionHomeMobile from "../../Components/PositionHome";
import { useNavigate } from "react-router-dom";
import { fetchApplyList } from "../../Libs/api";

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
  width: 85%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 80px;
`;

const ApplyCompanyInfoContainer = styled.div`
  width: 100%;
`;

const ApplyCompanyInfoGrid = styled.div`
  margin-top: 30px;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  grid-gap: 25px;
`;

const ApplyCompanyTitle = styled.div`
  width: 100%;
  padding-top: 100px;
  font-size: 25px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
`;

const ApplyPositionNoData = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.5);
`;

// 모바일 화면
const ApplyCompanyInfoMobile = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  padding-bottom: 40px;
`;

function Apply() {
  const large = useRecoilValue(resizeState);
  const { data: applyPositionData } = useQuery(["applyList"], fetchApplyList);

  const isLoadings = false;

  // 뒤로가기
  const navagate = useNavigate();
  const handleGoback = () => {
    navagate(-1);
  };

  return (
    <ApplyContainer>
      <ApplyCompanyInfoContainer>
        {large === "Mobile" ? (
          <BackDiv>
            <BackBtn onClick={handleGoback}>
              <IoIosArrowBack />
            </BackBtn>
            <BackHr />
          </BackDiv>
        ) : null}
        <ApplyCompanyTitle>내가 지원한 채용 공고들</ApplyCompanyTitle>
        {isLoadings ? (
          <Loading />
        ) : (
          <>
            {large === "Web" ? (
              <ApplyCompanyInfoGrid>
                {applyPositionData?.data?.map((position) => (
                  <PositionItem
                    id={position.id}
                    key={position.id}
                    positionImage={position.positionImage}
                    companyName={position.companyName}
                    positionTitle={position.positionTitle}
                    positionSkilled={position.positionSkilled}
                    positionRegion={position.positionRegion}
                  />
                ))}
              </ApplyCompanyInfoGrid>
            ) : (
              <ApplyCompanyInfoMobile>
                {applyPositionData?.data?.map((position) => (
                  <PositionHomeMobile
                    id={position.id}
                    key={position.id}
                    positionImage={position.positionImage}
                    companyName={position.companyName}
                    positionTitle={position.positionTitle}
                    positionSkilled={position.positionSkilled}
                    positionRegion={position.positionRegion}
                  />
                ))}
              </ApplyCompanyInfoMobile>
            )}
            {applyPositionData?.data?.length === 0 ? (
              <ApplyPositionNoData>
                데이터가 존재하지 않습니다.
              </ApplyPositionNoData>
            ) : null}
          </>
        )}
      </ApplyCompanyInfoContainer>
    </ApplyContainer>
  );
}

export default Apply;
