import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { resizeState } from "../../atom";
import Loading from "../../Components/Loading";
import PositionItem from "../../Components/Position-item";
import PositionHomeMobile from "../../Components/PositionHome";
import { fetchHomePositionsPagi } from "../../Libs/api";
import { useState } from "react";
import Pagination from "react-js-pagination";
import "./Paging.css";

const HomeContainer = styled.div`
  width: 85%;
  max-width: 1200px;
  margin-left: auto;
  min-height: 534px;
  margin-right: auto;
`;

const MainCompanyInfoContainer = styled.div`
  width: 100%;
`;

const CompanyInfoGrid = styled.div`
  margin-top: 120px;
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
  min-height: 480px;
`;

const HomeMobileFotterContainer = styled.footer`
  width: 100%;
  height: 150px;
  bottom: 0px;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  text-align: center;
  padding-top: 20px;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 400;
`;

const HomeWebFooterContainer = styled.div``;

const HomeFotterContainer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.1);
  text-align: center;
  padding-top: 20px;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 400;
  position: relative;
  transform: translateY(0%);
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  bottom: 120px;
`;

function Home() {
  const large = useRecoilValue(resizeState);

  // 페이징
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
  };

  const { data: allPositionData, isLoading } = useQuery(
    ["allPosition", page - 1],
    () => fetchHomePositionsPagi(page - 1)
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
        <>
          <Pagination
            activePage={page}
            itemsCountPerPage={8}
            totalItemsCount={allPositionData?.data2}
            pageRangeDisplayed={5}
            prevPageText={"<"}
            nextPageText={">"}
            onChange={handlePageChange}
          />
          <HomeMobileFotterContainer>
            ©202347024. Chominho.
          </HomeMobileFotterContainer>
        </>
      ) : (
        <>
          <PaginationContainer>
            <Pagination
              activePage={page}
              itemsCountPerPage={8}
              totalItemsCount={allPositionData?.data2}
              pageRangeDisplayed={5}
              prevPageText={"<"}
              nextPageText={">"}
              onChange={handlePageChange}
            />
          </PaginationContainer>
          <HomeWebFooterContainer></HomeWebFooterContainer>
          <HomeFotterContainer>©202347024. Chominho.</HomeFotterContainer>
        </>
      )}
    </>
  );
}

export default Home;
