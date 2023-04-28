import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { resizeState } from "../../atom";
import Loading from "../../Components/Loading";
import PositionItem from "../../Components/Position-item";
import PositionHomeMobile from "../../Components/PositionHome";
import { fetchHomePositions } from "../../Libs/api";

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

// 모바일 화면
const CompanyInfoMobile = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  padding-bottom: 40px;
`;

function Home() {
  const large = useRecoilValue(resizeState);

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
          <>
            {large === "Web" ? (
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
            ) : (
              <CompanyInfoMobile>
                {allPositionData?.data.map((position) => (
                  <PositionHomeMobile
                    id={position.id}
                    key={position.id}
                    positionImage={position.positionImage}
                    companyName={position.company.companyName}
                    positionTitle={position.positionTitle}
                    positionSkilled={position.skilled}
                    positionRegion={position.region}
                  />
                ))}
              </CompanyInfoMobile>
            )}
          </>
        )}
      </MainCompanyInfoContainer>
    </HomeContainer>
  );
}

export default Home;
