import { Link } from "react-router-dom";
import styled from "styled-components";

const CompanyInfoDetailImg = styled.div`
  width: 100%;
  height: 150px;
  background-color: #d9e1e8;
  border-radius: 10px;
  transition: opacity 0.1s linear;
`;

const CompanyInfoDetail = styled.div`
  /* background-color: whitesmoke; */
  &:hover {
    ${CompanyInfoDetailImg} {
      opacity: 0.3;
    }
  }
`;

const CompanyInfoDetailContainer = styled.div`
  margin: 5px;
`;

const CompanyInfoDetailName = styled.div`
  font-size: 12px;
  font-weight: 400;
`;

const CompanyInfoDetailPositionTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const CompanyInfoDetailPositionSkilled = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 400;
`;

const CompanyInfoDetailPositionRegion = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 400;
`;

function PositionItem({
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
        <CompanyInfoDetailImg>{positionImage}</CompanyInfoDetailImg>
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

export default PositionItem;
