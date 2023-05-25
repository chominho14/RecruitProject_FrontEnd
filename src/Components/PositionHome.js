import { Link } from "react-router-dom";
import styled from "styled-components";

const CompanyInfoDetailImgNO = styled.div`
  width: 100%;
  height: 250px;
  background-color: #d9e1e8;
  border-radius: 10px;
  transition: opacity 0.1s linear;
`;

const CompanyInfoDetailImgNoDiv = styled.div`
  font-size: 200px;
  font-weight: 400;
  text-align: center;
`;

const CompanyInfoDetailImgOK = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  border: 1px solid #ddd;
  transition: opacity 0.1s linear;
`;

const CompanyInfoDetail = styled.div`
  /* background-color: whitesmoke; */
  &:hover {
    ${CompanyInfoDetailImgOK} {
      opacity: 0.7;
    }

    ${CompanyInfoDetailImgNO} {
      opacity: 0.7;
    }
  }
`;

const CompanyInfoDetailContainer = styled.div`
  margin: 12px;
`;

const CompanyInfoDetailName = styled.div`
  font-size: 15px;
  font-weight: 400;
`;

const CompanyInfoDetailPositionTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  padding-top: 2px;
`;

const CompanyInfoDetailPositionSkilled = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 400;
  padding-top: 2px;
`;

const CompanyInfoDetailPositionRegion = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 400;
  padding-top: 2px;
`;

function PositionHomeMobile({
  id,
  positionImage,
  companyName,
  positionTitle,
  positionSkilled,
  positionRegion,
}) {
  return (
    <Link to={`/position/${id}`}>
      <CompanyInfoDetail>
        {positionImage ? (
          <CompanyInfoDetailImgOK src={positionImage} />
        ) : (
          <CompanyInfoDetailImgNO>
            <CompanyInfoDetailImgNoDiv>
              {positionTitle.slice(0, 1)}
            </CompanyInfoDetailImgNoDiv>
          </CompanyInfoDetailImgNO>
        )}

        <CompanyInfoDetailContainer>
          <CompanyInfoDetailName>{companyName}</CompanyInfoDetailName>
          <CompanyInfoDetailPositionTitle>
            {positionTitle}
          </CompanyInfoDetailPositionTitle>
          <CompanyInfoDetailPositionSkilled>
            {positionSkilled}
          </CompanyInfoDetailPositionSkilled>
          <CompanyInfoDetailPositionRegion>
            {positionRegion}
          </CompanyInfoDetailPositionRegion>
        </CompanyInfoDetailContainer>
      </CompanyInfoDetail>
    </Link>
  );
}

export default PositionHomeMobile;
