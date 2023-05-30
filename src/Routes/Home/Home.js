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

const ApplyPositionNoData = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.5);
`;

const HomeFotterContainer = styled.footer`
  width: 100%;
  height: 100px;
  bottom: 0px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.1);
  text-align: center;
  padding-top: 20px;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 400;
`;

const HomeMobileFotterContainer = styled.footer`
  width: 100%;
  height: 150px;
  bottom: 0px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.1);
  text-align: center;
  padding-top: 20px;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 400;
`;

function Home() {
  const large = useRecoilValue(resizeState);

  const { data: allPositionData, isLoading } = useQuery(
    ["allPosition"],
    fetchHomePositions
  );

  return (
    <>
      <HomeContainer>
        <MainCompanyInfoContainer>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {large === "Web" ? (
                <CompanyInfoGrid>
                  {allPositionData?.data?.map((position) => (
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
                </CompanyInfoGrid>
              ) : (
                <CompanyInfoMobile>
                  {allPositionData?.data?.map((position) => (
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
                  {/* {allPositionData?.data?.map((position) => (
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
              {allPositionData?.data?.map((position) => (
                <PositionHomeMobile
                  id={position.id}
                  key={position.id}
                  positionImage={position.positionImage}
                  companyName={position.company.companyName}
                  positionTitle={position.positionTitle}
                  positionSkilled={position.skilled}
                  positionRegion={position.region}
                />
              ))} */}
                </CompanyInfoMobile>
              )}
            </>
          )}

          {allPositionData?.data?.length === 0 ? (
            <ApplyPositionNoData>
              데이터가 존재하지 않습니다.
            </ApplyPositionNoData>
          ) : null}
        </MainCompanyInfoContainer>
      </HomeContainer>
      {large === "Mobile" ? (
        <HomeMobileFotterContainer>
          ©202347024. Chominho.
        </HomeMobileFotterContainer>
      ) : (
        <HomeFotterContainer>©202347024. Chominho.</HomeFotterContainer>
      )}
    </>
  );
}

export default Home;
