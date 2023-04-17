import styled from "styled-components";
import PositionItem from "../../Components/Position-item";
import useUser from "../../Libs/useUser";

const HomeContainer = styled.div`
  width: 85%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const MainCompanyInfoContainer = styled.div`
  width: 100%;
`;

const CompanyInfoGrid = styled.div`
  margin-top: 100px;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  grid-gap: 25px;
`;

function Home() {
  const user = useUser();

  console.log(user);
  return (
    <HomeContainer>
      home
      <MainCompanyInfoContainer>
        <CompanyInfoGrid>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
            <PositionItem
              id={i}
              key={i}
              positionImage={"이미지"}
              companyName={"회사 이름"}
              positionTitle={"채용 제목"}
              positionSkilled={"기술 스택"}
              positionRegion={"장소"}
            />
          ))}
        </CompanyInfoGrid>
      </MainCompanyInfoContainer>
    </HomeContainer>
  );
}

export default Home;
