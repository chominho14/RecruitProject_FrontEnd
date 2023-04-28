import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Loading from "../../Components/Loading";
import PositionItem from "../../Components/Position-item";
import { fetchHomePositions } from "../../Libs/api";
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
  const { data: allPositionData, isLoading } = useQuery(
    ["allPosition"],
    fetchHomePositions
  );

  return (
    <HomeContainer>
      <MainCompanyInfoContainer>
        {isLoading ? (
          <Loading />
        ) : (
          <CompanyInfoGrid>
            {allPositionData?.data.map((position) => (
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
        )}
      </MainCompanyInfoContainer>
    </HomeContainer>
  );
}

export default Home;
