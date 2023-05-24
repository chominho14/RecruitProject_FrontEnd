import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

const ModalEntire = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 1;
`;

const ModalContainer = styled.div`
  background-color: white;
  margin-top: 50px;
  width: 100%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  border-radius: 7px;
  padding-bottom: 45px;
`;

const ModalTopDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalTopLeftDiv = styled.div`
  font-size: x-large;
  font-weight: 600;
`;

const ModalTopRightCloseDiv = styled.div`
  font-size: 20px;
  color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }
`;

const ModalSecondDiv = styled.div`
  padding-top: 20px;
  font-size: small;
  font-weight: 400;
  line-height: 20px;
  padding-bottom: 10px;
`;

const ModalHr = styled.hr`
  border: 1px solid #ddd;
`;

const ModalDetailDiv = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
`;

const ModalDetailLeftDiv = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
`;

const ModalDetailRightDiv = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.5);
  padding-top: 3px;
`;

const ModalCloseContainer = styled.div`
  width: 100%;
`;

const ModalCloseDiv = styled.div`
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

function ModalBasic({ setModalOpen }) {
  const closeModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <ModalEntire>
      <ModalContainer>
        <ModalTopDiv>
          <ModalTopLeftDiv>[개인정보 제3자 제공에 대한 동의]</ModalTopLeftDiv>
          <ModalTopRightCloseDiv onClick={closeModal}>
            <AiOutlineClose />
          </ModalTopRightCloseDiv>
        </ModalTopDiv>
        <ModalSecondDiv>
          인하공업전문대학교는 다음과 같이 개인정보를 제3자에게 제공하고자
          합니다. 아래의 사항을 확인하신후, 동의 여부를 체크해주시기 바랍니다.
        </ModalSecondDiv>
        <ModalHr />
        <ModalDetailDiv>
          <ModalDetailLeftDiv>제공받는 자</ModalDetailLeftDiv>
          <ModalDetailRightDiv>
            개인 회원이 입사 지원한 기업
          </ModalDetailRightDiv>
        </ModalDetailDiv>
        <ModalHr />
        <ModalDetailDiv>
          <ModalDetailLeftDiv>제공받는 자의 이용 목적</ModalDetailLeftDiv>
          <ModalDetailRightDiv>
            채용 전형 진행을 위한 지원자 이력서 조회, 저장
          </ModalDetailRightDiv>
        </ModalDetailDiv>
        <ModalHr />
        <ModalDetailDiv>
          <ModalDetailLeftDiv>제공 항목</ModalDetailLeftDiv>
          <ModalDetailRightDiv>이름, 학번, 이력서 정보</ModalDetailRightDiv>
        </ModalDetailDiv>
        <ModalHr />
        <ModalDetailDiv>
          <ModalDetailLeftDiv>보유 및 이용기간</ModalDetailLeftDiv>
          <ModalDetailRightDiv>
            채용 전형 종료 시점까지 또는 입사 지원 후 90일 까지
          </ModalDetailRightDiv>
        </ModalDetailDiv>
        <ModalCloseContainer>
          <ModalCloseDiv onClick={closeModal}>닫기</ModalCloseDiv>
        </ModalCloseContainer>
      </ModalContainer>
    </ModalEntire>
  );
}

export default ModalBasic;
