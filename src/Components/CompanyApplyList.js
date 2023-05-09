import { Link } from "react-router-dom";
import styled from "styled-components";

const CompanyApplyListContainer = styled.div`
  height: 70px;
  border: 1px solid #ddd;
  margin: 10px auto;
  /* margin-left: auto;
  margin-right: auto; */
  border-radius: 8px;
  background-color: rgba(224, 224, 224, 0.5);
  padding: 10px 18px;
  max-width: 500px;

  &:hover {
    background-color: rgba(224, 224, 224);
    border: 1px solid black;
  }
`;

const CompanyApplyListTitleDiv = styled.div`
  font-weight: 400;
  font-size: 18px;
`;

const CompanyApplyListSkillDiv = styled.div`
  color: gray;
  font-weight: 400;
  font-size: 13px;
  padding-top: 5px;
`;

function CompanyApplyList({ id, positionName, skill }) {
  return (
    <div>
      <Link to={`/position/${id}`}>
        <CompanyApplyListContainer key={id}>
          <CompanyApplyListTitleDiv>{positionName}</CompanyApplyListTitleDiv>
          <CompanyApplyListSkillDiv>{skill}</CompanyApplyListSkillDiv>
        </CompanyApplyListContainer>
      </Link>
    </div>
  );
}

export default CompanyApplyList;
