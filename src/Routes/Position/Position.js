import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { resizeState } from "../../atom";
import { IoIosArrowBack } from "react-icons/io";
import { BsBookmarkCheck } from "react-icons/bs";

const PositionContainer = styled.div`
  width: 85%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
`;

const PositionCompanyWithPositionContainer = styled.div`
  width: 100%;
  padding-top: 70px;
`;

const PositionTopCompanyNameDiv = styled.div`
  font-size: x-large;
  font-weight: 300;
  margin-top: 10px;
`;

const PoositionTopPositionTitleDiv = styled.div`
  font-size: xx-large;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 10px;
`;

// ------------------웹 화면 -------------------------

const PositionWebMiddleContainer = styled.div`
  display: flex;
`;

const PositionWebMiddleLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
`;

const PositionWebMiddleImgContainer = styled.div`
  width: 100%;
`;

const PositionWebMiddleLeftImg = styled.div`
  width: 95%;
  padding-top: 56.25%;
  background-color: whitesmoke;
  border-radius: 10px;
`;

const PositionWebMiddleLeftWhereDiv = styled.div`
  width: 95%;
  font-size: large;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const PositionWebMiddleLeftDescription = styled.div`
  width: 95%;
  font-weight: 300;
  margin-bottom: 10px;
`;

const PositionWebMiddleLeftSKill = styled.div`
  width: 95%;
  font-weight: 400;
  opacity: 0.7;
`;

const PositionWebMiddleLeftHr = styled.hr`
  margin-top: 16px;
  margin-bottom: 16px;
  margin-left: 0px;
  margin-right: 5%;
  border: 1px solid #ddd;
`;

const PositionWebMiddleLeftRegion = styled.div`
  width: 95%;
  font-size: large;
  font-weight: 400;
`;

const PositionWebMiddleLeftAddress = styled.div`
  width: 95%;
  font-weight: 300;
  opacity: 0.8;
`;

const PositionWebMiddleRightContainer = styled.div`
  width: 35%;
`;

const PositionWebMiddleRightDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  position: sticky;
  top: 90px;
`;

const PositionWebMiddleRightTitle = styled.div`
  font-size: large;
  font-weight: 600;
  padding-top: 3px;
  padding-bottom: 3px;
`;

const PositionWebMiddleRightCompany = styled.div`
  font-size: medium;
  font-weight: 500;
  opacity: 0.7;
  padding-top: 3px;
`;

const PositionWebMiddleRighthr = styled.hr`
  margin: 10px 0px;
  border: 1px solid #ddd;
`;

const PositionWebMiddleRightDesContainer = styled.div`
  width: 100%;
  display: flex;
`;

const PositionWebMiddleRightDesLeftDiv = styled.div`
  font-weight: 400;
  opacity: 0.5;
  width: 30%;
`;

const PositionWebMiddleRightDesRightDiv = styled.div`
  width: 70%;
  font-weight: 400;
  opacity: 0.8;
`;

const PositionWebMiddleRightHr = styled.hr`
  margin: 8px 0px;
  border: 0.5px solid #ddd;
`;

const PositionWebMiddleRightBtnContainer = styled.div`
  padding-top: 20px;
  display: flex;
`;

const PositionWebSaveBtn = styled.button`
  color: black;
  border: 1px solid;
  border-radius: 0.375rem;
  font-size: 18px;
  line-height: 20px;
  font-weight: 500;
  width: 60px;
  height: 50px;
  cursor: pointer;
  background-color: white;
  border-color: #d9e1e8;
  &:hover {
    background-color: whitesmoke;
  }
`;

const PositionWebApplyBtn = styled.button`
  color: white;
  border: 1px;
  border-color: transparent;
  border-radius: 0.375rem;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  width: 100%;
  padding: 5px;
  margin-left: 4px;
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

// ------------------모바일 화면 -------------------------

const PositionMobileMiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  z-index: 0;
`;

const PositionMobileMiddleImgContainer = styled.div`
  width: 100%;
`;

const PositionMobileMiddleImg = styled.div`
  width: 95%;
  padding-top: 56.25%;
  background-color: whitesmoke;
  border-radius: 10px;
`;

const PositionMobileHeaderContainer = styled.div`
  width: 100%;
  position: sticky;
  bottom: 100px;
  height: 50px;
  background-color: white;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  z-index: 1;
  display: flex;
  padding: 5px;
`;

const PositionMobileSaveBtn = styled.button`
  color: black;
  border: 1px solid;
  border-radius: 0.375rem;
  font-size: 18px;
  line-height: 20px;
  font-weight: 500;
  width: 50px;
  height: 38px;
  cursor: pointer;
  background-color: white;
  border-color: #d9e1e8;
  &:hover {
    background-color: whitesmoke;
  }
`;

const PositionMobileApplyBtn = styled.button`
  color: white;
  border: 1px;
  border-color: transparent;
  border-radius: 0.375rem;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  width: 100%;
  padding: 5px;
  margin-left: 4px;
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

function Position() {
  const large = useRecoilValue(resizeState);

  return (
    <PositionContainer>
      {large === "Mobile" ? (
        <div>
          <button>
            <IoIosArrowBack />
          </button>
        </div>
      ) : null}
      <PositionCompanyWithPositionContainer>
        <PositionTopCompanyNameDiv>회사명</PositionTopCompanyNameDiv>
        <PoositionTopPositionTitleDiv>채용공고명</PoositionTopPositionTitleDiv>
      </PositionCompanyWithPositionContainer>
      {large === "Web" ? (
        <PositionWebMiddleContainer>
          <PositionWebMiddleLeftContainer>
            <PositionWebMiddleImgContainer>
              <PositionWebMiddleLeftImg>사진</PositionWebMiddleLeftImg>
            </PositionWebMiddleImgContainer>
            <PositionWebMiddleLeftWhereDiv>
              "회사명", 어떤 곳인가요?
            </PositionWebMiddleLeftWhereDiv>
            <PositionWebMiddleLeftDescription>
              "채용공고 description"
            </PositionWebMiddleLeftDescription>
            <PositionWebMiddleLeftWhereDiv>
              "채용공고", 무엇을 하나요?
            </PositionWebMiddleLeftWhereDiv>
            <PositionWebMiddleLeftSKill>"기술스택"</PositionWebMiddleLeftSKill>
            <PositionWebMiddleLeftHr />
            <PositionWebMiddleLeftRegion>근무지역</PositionWebMiddleLeftRegion>

            <PositionWebMiddleLeftAddress>
              "회사 주소"
            </PositionWebMiddleLeftAddress>
          </PositionWebMiddleLeftContainer>
          <PositionWebMiddleRightContainer>
            <PositionWebMiddleRightDiv>
              <PositionWebMiddleRightTitle>
                "채용공고명"
              </PositionWebMiddleRightTitle>
              <PositionWebMiddleRightCompany>
                "회사명"
              </PositionWebMiddleRightCompany>
              <PositionWebMiddleRighthr />
              <PositionWebMiddleRightDesContainer>
                <PositionWebMiddleRightDesLeftDiv>
                  연봉
                </PositionWebMiddleRightDesLeftDiv>
                <PositionWebMiddleRightDesRightDiv>
                  "연봉"
                </PositionWebMiddleRightDesRightDiv>
              </PositionWebMiddleRightDesContainer>
              <PositionWebMiddleRightHr />
              <PositionWebMiddleRightDesContainer>
                <PositionWebMiddleRightDesLeftDiv>
                  마감일
                </PositionWebMiddleRightDesLeftDiv>
                <PositionWebMiddleRightDesRightDiv>
                  "마감일"
                </PositionWebMiddleRightDesRightDiv>
              </PositionWebMiddleRightDesContainer>
              <PositionWebMiddleRightBtnContainer>
                <PositionWebSaveBtn>
                  <BsBookmarkCheck />
                </PositionWebSaveBtn>
                <PositionWebApplyBtn>지원하기</PositionWebApplyBtn>
              </PositionWebMiddleRightBtnContainer>
            </PositionWebMiddleRightDiv>
          </PositionWebMiddleRightContainer>
        </PositionWebMiddleContainer>
      ) : (
        <>
          <PositionMobileMiddleContainer>
            <div>
              <PositionMobileMiddleImgContainer>
                <PositionMobileMiddleImg>사진</PositionMobileMiddleImg>
              </PositionMobileMiddleImgContainer>
              <PositionWebMiddleLeftWhereDiv>
                "회사명", 어떤 곳인가요?
              </PositionWebMiddleLeftWhereDiv>
              <PositionWebMiddleLeftDescription>
                "채용공고 description"
              </PositionWebMiddleLeftDescription>
              <PositionWebMiddleLeftWhereDiv>
                "채용공고", 무엇을 하나요?
              </PositionWebMiddleLeftWhereDiv>
              <PositionWebMiddleLeftDescription>
                "기술스택"
              </PositionWebMiddleLeftDescription>
              <PositionWebMiddleRighthr />
              <PositionWebMiddleLeftRegion>
                근무지역
              </PositionWebMiddleLeftRegion>
              <PositionWebMiddleLeftAddress>
                "회사 주소"
              </PositionWebMiddleLeftAddress>
            </div>
          </PositionMobileMiddleContainer>
          <PositionMobileHeaderContainer>
            <PositionMobileSaveBtn>
              <BsBookmarkCheck />
            </PositionMobileSaveBtn>
            <PositionMobileApplyBtn>지원하기</PositionMobileApplyBtn>
          </PositionMobileHeaderContainer>
        </>
      )}
    </PositionContainer>
  );
}

export default Position;
