import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { resizeState } from "../../atom";
import Loading from "../../Components/Loading";
import PositionItem from "../../Components/Position-item";
import PositionHomeMobile from "../../Components/PositionHome";
import { fetchHomePositionsPagiSearchTest } from "../../Libs/api";
import { useState } from "react";
import Pagination from "react-js-pagination";
import "./Paging.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useForm } from "react-hook-form";

const HomeContainer = styled.div`
  width: 85%;
  max-width: 1200px;
  margin-left: auto;
  min-height: 555px;
  margin-right: auto;
`;

const MainCompanyInfoContainer = styled.div`
  width: 100%;
`;

// --------------------  색창 css --------------------
const HomeSearchContainer = styled.div`
  margin-top: 100px;
  border-radius: 6px;
  padding: 10px;
  border: 2px solid;
  border-color: #e2e2e2;
  display: flex;
  height: 60px;
`;

const HomeSearchIconsContainer = styled.div`
  font-size: x-large;
  padding-top: 5px;
  width: 40px;
`;

const HomeSearchInput = styled.input`
  width: 100%;
  font-size: large;
  border: none;
  &::placeholder {
    color: rgba(139, 134, 135, 0.5);
  }
  &:hover {
    border-color: rgba(43, 144, 217, 0.5);
  }
  &:active,
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-width: 2px;
    border-color: rgba(43, 144, 217, 0.5);
  }
`;

const HomeSearchForm = styled.form`
  display: flex;
  width: 100%;
`;

const HomeSearchButtonContainer = styled.button`
  width: 80px;
  display: flex;
  border-radius: 20px;
  color: white;
  background-color: rgba(43, 144, 217, 0.7);
  border-color: rgba(43, 144, 217, 1);
  padding-left: 12px;
  cursor: pointer;
  &:hover {
    background-color: rgba(43, 144, 217, 1);
  }
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-width: 2px;
    border-color: rgba(43, 144, 217, 1);
  }
`;

const HomeSearchRightLeft = styled.div`
  font-size: 15px;
  padding-top: 7px;
`;

const HomeSearchRightRight = styled.div`
  font-size: 20px;
  padding-top: 6px;
`;

const CompanyInfoGrid = styled.div`
  margin-top: 40px;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  grid-gap: 25px;
`;

// 모바일 화면

const HomeSearchMobileContainer = styled.div`
  margin-top: 40px;
  border-radius: 6px;
  padding: 10px;
  border: 2px solid;
  border-color: #e2e2e2;
  display: flex;
  height: 60px;
`;

const HomeSearchMobileRightLeft = styled.div`
  font-size: 12px;
  padding-top: 7px;
`;

const HomeSearchMobileRightRight = styled.div`
  font-size: 15px;
  padding-top: 7px;
`;

const CompanyInfoMobile = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
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

  // 검색 기능
  const [searchData, setSearchData] = useState("");
  const { register, handleSubmit } = useForm();

  const onValid = (data) => {
    setSearchData(data.keyword);
  };

  // 페이징
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
  };

  const { data: allPositionData, isLoading } = useQuery(
    ["allPosition", page - 1, searchData],
    () => fetchHomePositionsPagiSearchTest(page - 1, searchData)
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
                <>
                  <HomeSearchContainer>
                    <HomeSearchIconsContainer>
                      <AiOutlineSearch />
                    </HomeSearchIconsContainer>
                    <HomeSearchForm onSubmit={handleSubmit(onValid)}>
                      <HomeSearchInput
                        {...register("keyword")}
                        name="keyword"
                        type="text"
                        placeholder="키워드"
                      />
                      <HomeSearchButtonContainer>
                        <HomeSearchRightLeft>검색</HomeSearchRightLeft>
                        <HomeSearchRightRight>
                          <AiOutlineSearch />
                        </HomeSearchRightRight>
                      </HomeSearchButtonContainer>
                    </HomeSearchForm>
                  </HomeSearchContainer>
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
                </>
              ) : (
                <>
                  <HomeSearchMobileContainer>
                    <HomeSearchIconsContainer>
                      <AiOutlineSearch />
                    </HomeSearchIconsContainer>
                    <HomeSearchForm onSubmit={handleSubmit(onValid)}>
                      <HomeSearchInput
                        {...register("keyword")}
                        name="keyword"
                        type="text"
                        placeholder="키워드"
                      />
                      <HomeSearchButtonContainer>
                        <HomeSearchMobileRightLeft>
                          검색
                        </HomeSearchMobileRightLeft>
                        <HomeSearchMobileRightRight>
                          <AiOutlineSearch />
                        </HomeSearchMobileRightRight>
                      </HomeSearchButtonContainer>
                    </HomeSearchForm>
                  </HomeSearchMobileContainer>
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
                </>
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
            totalItemsCount={
              allPositionData?.data2 === undefined ? 0 : allPositionData?.data2
            }
            pageRangeDisplayed={5}
            prevPageText={"<"}
            nextPageText={">"}
            onChange={handlePageChange}
          />
          <HomeMobileFotterContainer>
            ©202347024 chominho.
          </HomeMobileFotterContainer>
        </>
      ) : (
        <>
          <PaginationContainer>
            <Pagination
              activePage={page}
              itemsCountPerPage={8}
              totalItemsCount={
                allPositionData?.data2 === undefined
                  ? 0
                  : allPositionData?.data2
              }
              pageRangeDisplayed={5}
              prevPageText={"<"}
              nextPageText={">"}
              onChange={handlePageChange}
            />
          </PaginationContainer>
          <HomeWebFooterContainer></HomeWebFooterContainer>
          <HomeFotterContainer>©202347024 chominho.</HomeFotterContainer>
        </>
      )}
    </>
  );
}

export default Home;
