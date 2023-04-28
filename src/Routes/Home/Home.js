import styled from "styled-components";
import PositionItem from "../../Components/Position-item";
import useGet from "../../Libs/useGet";
import useUser from "../../Libs/useUser";

const HomeContainer = styled.div`
  width: 85%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 80px;
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

  const positions = useGet();

  console.log(user);
  console.log(positions);

  return (
    <HomeContainer>
      <MainCompanyInfoContainer>
        <CompanyInfoGrid>
          {positions?.data.map((position) => (
            <PositionItem
              id={position.id}
              key={position.id}
              positionImage={position.positionImage}
              companyName={position.company.companyName}
              positionTitle={position.positionTitle}
              positionSkilled={position.skilled}
              positionRegion={position.region}
            />
          ))}
        </CompanyInfoGrid>
      </MainCompanyInfoContainer>
    </HomeContainer>
  );
}

export default Home;
