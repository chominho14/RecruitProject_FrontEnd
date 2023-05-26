import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { resizeState } from "../../atom";
import { IoIosArrowBack } from "react-icons/io";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPositionDetail } from "../../Libs/api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading";
import useUser from "../../Libs/useUser";
import useMuatationH from "../../Libs/useMutationH";
import useMutations from "../../Libs/useMutations";
import axios from "axios";

const PositionContainer = styled.div`
  width: 85%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
`;

const BackDiv = styled.div`
  position: absolute;
  top: 40px;
  left: 35px;
  width: 100%;
`;

const BackHr = styled.hr`
  margin-left: 0px;
  margin-right: 15%;
  border: 1px solid #ddd;
`;

const BackBtn = styled.button`
  color: black;
  border: none;
  font-size: 18px;
  line-height: 20px;
  font-weight: 500;
  width: 30px;
  height: 20px;
  cursor: pointer;
  background-color: white;
  border-color: #d9e1e8;
  border-radius: 8px;
  &:hover {
    background-color: whitesmoke;
  }
`;

const PositionCompanyWithPositionContainer = styled.div`
  width: 100%;
  padding-top: 70px;
`;

const PositionTopCompanyNameDiv = styled.div`
  font-size: x-large;
  font-weight: 300;
  margin-top: 10px;
`;

const PoositionTopPositionTitleDiv = styled.div`
  font-size: xx-large;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const PositionTopPositionTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

// ------------------웹 화면 -------------------------

const PositionWebMiddleContainer = styled.div`
  display: flex;
`;

const PositionWebMiddleLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
`;

const PositionWebMiddleImgContainer = styled.div`
  width: 100%;
`;

const PositionWebMiddleLeftImgNull = styled.div`
  width: 95%;
  padding-top: 70%;
  background-color: #d9e1e8;
  border-radius: 10px;
`;

const PositionWebMiddleLeftImg = styled.img`
  width: 95%;
  background-color: whitesmoke;
  border-radius: 10px;
`;

const PositionWebMiddleLeftWhereDiv = styled.div`
  width: 95%;
  font-size: large;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const PositionWebMiddleLeftDescription = styled.div`
  width: 95%;
  font-weight: 300;
  margin-bottom: 10px;
`;

const PositionWebMiddleLeftSKill = styled.div`
  width: 95%;
  font-weight: 500;
  opacity: 0.5;
`;

const PositionWebMiddleLeftHr = styled.hr`
  margin-top: 16px;
  margin-bottom: 16px;
  margin-left: 0px;
  margin-right: 5%;
  border: 1px solid #ddd;
`;

const PositionWebMiddleLeftRegion = styled.div`
  width: 95%;
  font-size: large;
  font-weight: 400;
`;

const PositionWebMiddleLeftAddress = styled.div`
  width: 95%;
  font-weight: 300;
  opacity: 0.8;
`;

const PositionWebMiddleRightContainer = styled.div`
  width: 35%;
`;

const PositionWebMiddleRightDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  position: sticky;
  top: 90px;
`;

const PositionWebMiddleRightTitle = styled.div`
  font-size: large;
  font-weight: 600;
  padding-top: 3px;
  padding-bottom: 3px;
`;

const PositionWebMiddleRightCompany = styled.div`
  font-size: medium;
  font-weight: 500;
  opacity: 0.7;
  padding-top: 3px;
`;

const PositionWebMiddleRighthr = styled.hr`
  margin: 10px 0px;
  border: 1px solid #ddd;
`;

const PositionWebMiddleRightDesContainer = styled.div`
  width: 100%;
  display: flex;
`;

const PositionWebMiddleRightDesLeftDiv = styled.div`
  font-weight: 600;
  opacity: 0.4;
  width: 30%;
`;

const PositionWebMiddleRightDesRightDiv = styled.div`
  width: 70%;
  font-weight: 400;
  opacity: 0.8;
`;

const PositionWebMiddleRightHr = styled.hr`
  margin: 8px 0px;
  border: 0.5px solid #ddd;
`;

const PositionWebMiddleRightBtnContainer = styled.div`
  padding-top: 20px;
  display: flex;
`;

const PositionWebSaveBtn = styled.button`
  border: 1px solid;
  border-radius: 0.375rem;
  font-size: 18px;
  line-height: 20px;
  font-weight: 500;
  width: 60px;
  height: 50px;
  cursor: pointer;
  color: ${(props) => (props.liked ? "#2b90d9" : "#d9e1e8")};
  background-color: white;
  border-color: #d9e1e8;
  &:hover {
    background-color: whitesmoke;
    color: ${(props) => (props.liked ? "blue" : "gray")};
  }
`;

const PositionWebApplyBtn = styled.button`
  color: white;
  border: 1px;
  border-color: transparent;
  border-radius: 0.375rem;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  width: 100%;
  padding: 5px;
  margin-left: 4px;
  cursor: pointer;
  background-color: rgba(43, 144, 217, 0.5);
  &:hover {
    background-color: rgba(43, 144, 217, 1);
  }
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-width: 2px;
  }
`;

// 지원 완료 됐을 시 버튼

const PositionApplyCompleteBtn = styled.div`
  color: white;
  border: 1px;
  border-color: transparent;
  border-radius: 0.375rem;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  width: 100%;
  padding: 5px;
  margin-left: 4px;
  text-align: center;
  padding-top: 14px;
  cursor: not-allowed;
  background-color: #d9e1e8;
`;

// ------------------모바일 화면 -------------------------

const PositionMobileMiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  z-index: 0;
`;

const PositionMobileMiddleImgContainer = styled.div`
  width: 100%;
`;

const PositionMobileMiddleImgNull = styled.div`
  width: 95%;
  padding-top: 70%;
  background-color: whitesmoke;
  border-radius: 10px;
`;

const PositionMobileMiddleImg = styled.img`
  width: 95%;
  background-color: whitesmoke;
  border-radius: 10px;
`;

const PositionMobileHeaderContainer = styled.div`
  width: 100%;
  position: sticky;
  bottom: 100px;
  height: 50px;
  background-color: white;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  z-index: 1;
  display: flex;
  padding: 5px;
`;

const PositionMobileSaveBtn = styled.button`
  border: 1px solid;
  border-radius: 0.375rem;
  font-size: 18px;
  line-height: 20px;
  font-weight: 500;
  width: 45px;
  height: 38px;
  cursor: pointer;
  color: ${(props) => (props.liked ? "#2b90d9" : "#d9e1e8")};
  background-color: white;
  border-color: #d9e1e8;
  &:hover {
    background-color: whitesmoke;
    color: ${(props) => (props.liked ? "blue" : "gray")};
  }
`;

const PositionMobileApplyBtn = styled.button`
  color: white;
  border: 1px;
  border-color: transparent;
  border-radius: 0.375rem;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  width: 100%;
  padding: 5px;
  margin-left: 4px;
  cursor: pointer;
  background-color: rgba(43, 144, 217, 0.5);
  &:hover {
    background-color: rgba(43, 144, 217, 1);
  }
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-width: 2px;
  }
`;

const PositionMobileApplyCompleteBtn = styled.div`
  color: white;
  border: 1px;
  border-color: transparent;
  border-radius: 0.375rem;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  width: 100%;
  padding: 5px;
  margin-left: 4px;
  text-align: center;
  padding-top: 10px;
  cursor: not-allowed;
  background-color: #d9e1e8;
`;

// position 삭제 버튼
const PositionDeleteDiv = styled.div`
  cursor: pointer;
  width: 55px;
  height: 35px;
  padding-top: 10px;

  text-align: center;
  font-weight: 600;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  float: right;
  background-color: rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

function Position() {
  const large = useRecoilValue(resizeState);

  const { positionId } = useParams();

  const {
    isLoading,
    data: positionData,
    refetch,
  } = useQuery(["positionData", positionId], () =>
    fetchPositionDetail(positionId)
  );

  console.log(positionData);

  // 뒤로가기
  const navigate = useNavigate();
  const handleGoback = () => {
    navigate(-1);
  };

  // 저장 버튼 클릭
  const userData = useUser();
  const [toggleSave, { loading }] = useMuatationH(
    `/position/${positionId}/save`
  );

  const onSaveClick = () => {
    if (userData?.authority !== "ROLE_USER") {
      return alert("일반 유저만 저장할 수 있습니다.");
    }

    if (!positionData) return;
    mutate();

    if (!loading) {
      toggleSave({});
    }
    setTimeout(() => {
      refetch();
    }, 50);
  };

  // 저장 버튼 옵티미스틱 UI
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    useMutations(`http://localhost:8080/api/position/${positionId}`),
    {
      onMutate: async (newData) => {
        await queryClient.cancelQueries(["positionData", positionId]);
        const prevCata = queryClient.getQueryData(["positionData", positionId]);

        queryClient.setQueryData(["positionData", positionId], () => ({
          ...positionData,
          data2: !positionData?.data2,
        }));
        return {
          prevCata,
        };
      },
    }
  );

  // 지원하기 버튼 클릭
  const onApplyClick = () => {
    if (userData?.authority !== "ROLE_USER") {
      return alert("일반 유저만 지원할 수 있습니다.");
    }
    if (positionData?.data3?.applyStatus === "APPLY_OK") {
      return alert("지원한 채용공고는 다시 지원이 안 됩니다.");
    }

    navigate(`/application/${positionId}`);
  };

  // 삭제 기능
  const sessionEmail = localStorage.getItem("userData");

  const onPositionDelete = () => {
    // axios.post(`http://localhost:8080/api/position/delete/${positionId}`);
    axios.post(process.env.DIS_URL + `/position/delete/${positionId}`);
    navigate("/");
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <PositionContainer>
          {large === "Mobile" ? (
            <BackDiv>
              <BackBtn onClick={handleGoback}>
                <IoIosArrowBack />
              </BackBtn>
              <BackHr />
            </BackDiv>
          ) : null}
          <PositionCompanyWithPositionContainer>
            <PositionTopCompanyNameDiv>
              {positionData?.data?.companyName}
            </PositionTopCompanyNameDiv>
            <PositionTopPositionTitleContainer>
              <PoositionTopPositionTitleDiv>
                {positionData?.data?.positionTitle}
              </PoositionTopPositionTitleDiv>
              <div>
                {positionData?.data?.email === sessionEmail ? (
                  <PositionDeleteDiv onClick={onPositionDelete}>
                    삭제
                  </PositionDeleteDiv>
                ) : null}
              </div>
            </PositionTopPositionTitleContainer>
          </PositionCompanyWithPositionContainer>
          {large === "Web" ? (
            <PositionWebMiddleContainer>
              <PositionWebMiddleLeftContainer>
                <PositionWebMiddleImgContainer>
                  {positionData?.data?.positionImage === null ? (
                    <PositionWebMiddleLeftImgNull></PositionWebMiddleLeftImgNull>
                  ) : (
                    <PositionWebMiddleLeftImg
                      src={positionData?.data?.positionImage}
                    />
                  )}
                </PositionWebMiddleImgContainer>
                <PositionWebMiddleLeftWhereDiv>
                  {positionData?.data?.positionTitle}, 어떤 곳인가요?
                </PositionWebMiddleLeftWhereDiv>
                <PositionWebMiddleLeftDescription>
                  {positionData?.data?.description}
                </PositionWebMiddleLeftDescription>
                <PositionWebMiddleLeftWhereDiv>
                  {positionData?.data?.positionTitle}, 무엇을 하나요?
                </PositionWebMiddleLeftWhereDiv>
                <PositionWebMiddleLeftSKill>
                  {positionData?.data?.skilled}
                </PositionWebMiddleLeftSKill>
                <PositionWebMiddleLeftHr />
                <PositionWebMiddleLeftRegion>
                  근무지역
                </PositionWebMiddleLeftRegion>

                <PositionWebMiddleLeftAddress>
                  {positionData?.data?.companyAddress}
                </PositionWebMiddleLeftAddress>
              </PositionWebMiddleLeftContainer>
              <PositionWebMiddleRightContainer>
                <PositionWebMiddleRightDiv>
                  <PositionWebMiddleRightTitle>
                    {positionData?.data?.positionTitle}
                  </PositionWebMiddleRightTitle>
                  <PositionWebMiddleRightCompany>
                    {positionData?.data?.companyName}
                  </PositionWebMiddleRightCompany>
                  <PositionWebMiddleRighthr />
                  <PositionWebMiddleRightDesContainer>
                    <PositionWebMiddleRightDesLeftDiv>
                      연봉
                    </PositionWebMiddleRightDesLeftDiv>
                    <PositionWebMiddleRightDesRightDiv>
                      {positionData?.data?.salary}
                    </PositionWebMiddleRightDesRightDiv>
                  </PositionWebMiddleRightDesContainer>
                  <PositionWebMiddleRightHr />
                  <PositionWebMiddleRightDesContainer>
                    <PositionWebMiddleRightDesLeftDiv>
                      마감일
                    </PositionWebMiddleRightDesLeftDiv>
                    <PositionWebMiddleRightDesRightDiv>
                      {positionData?.data?.deadline}
                    </PositionWebMiddleRightDesRightDiv>
                  </PositionWebMiddleRightDesContainer>
                  <PositionWebMiddleRightBtnContainer>
                    <PositionWebSaveBtn
                      liked={positionData.data2}
                      onClick={onSaveClick}
                    >
                      <BsBookmarkCheckFill />
                    </PositionWebSaveBtn>
                    {positionData?.data3?.applyStatus === "APPLY_OK" ? (
                      <PositionApplyCompleteBtn>
                        지원 완료
                      </PositionApplyCompleteBtn>
                    ) : (
                      <PositionWebApplyBtn onClick={onApplyClick}>
                        지원하기
                      </PositionWebApplyBtn>
                    )}
                  </PositionWebMiddleRightBtnContainer>
                </PositionWebMiddleRightDiv>
              </PositionWebMiddleRightContainer>
            </PositionWebMiddleContainer>
          ) : (
            <>
              <PositionMobileMiddleContainer>
                <div>
                  <PositionMobileMiddleImgContainer>
                    {positionData?.data?.positionImage === null ? (
                      <PositionMobileMiddleImgNull>
                        {" "}
                      </PositionMobileMiddleImgNull>
                    ) : (
                      <PositionMobileMiddleImg
                        src={positionData?.data?.positionImage}
                      />
                    )}
                  </PositionMobileMiddleImgContainer>
                  <PositionWebMiddleLeftWhereDiv>
                    {positionData?.data?.positionTitle}, 어떤 곳인가요?
                  </PositionWebMiddleLeftWhereDiv>
                  <PositionWebMiddleLeftDescription>
                    {positionData?.data?.description}
                  </PositionWebMiddleLeftDescription>
                  <PositionWebMiddleLeftWhereDiv>
                    {positionData?.data?.positionTitle}, 무엇을 하나요?
                  </PositionWebMiddleLeftWhereDiv>
                  <PositionWebMiddleLeftSKill>
                    {positionData?.data?.skilled}
                  </PositionWebMiddleLeftSKill>
                  <PositionWebMiddleRighthr />
                  <PositionWebMiddleLeftRegion>
                    근무지역
                  </PositionWebMiddleLeftRegion>
                  <PositionWebMiddleLeftAddress>
                    {positionData?.data?.companyAddress}
                  </PositionWebMiddleLeftAddress>
                </div>
              </PositionMobileMiddleContainer>
              <PositionMobileHeaderContainer>
                <PositionMobileSaveBtn
                  liked={positionData.data2}
                  onClick={onSaveClick}
                >
                  <BsBookmarkCheckFill />
                </PositionMobileSaveBtn>
                {positionData?.data3?.applyStatus === "APPLY_OK" ? (
                  <PositionMobileApplyCompleteBtn>
                    지원 완료
                  </PositionMobileApplyCompleteBtn>
                ) : (
                  <PositionMobileApplyBtn onClick={onApplyClick}>
                    지원하기
                  </PositionMobileApplyBtn>
                )}
              </PositionMobileHeaderContainer>
            </>
          )}
        </PositionContainer>
      )}
    </>
  );
}

export default Position;
