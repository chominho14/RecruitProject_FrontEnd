import styled, { keyframes } from "styled-components";

export const BounceAnimation = keyframes`
  0% { 
    margin-bottom: 0; 
  }

  50% { 
    margin-bottom: 1rem;
  }

  100% { 
    margin-bottom: 0;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-top: 300px;
`;

const LoadingDiv = styled.div`
  font-size: x-large;
  font-weight: 400;
  color: #2b90d9;
`;

const Dot = styled.div`
  background-color: #2b90d9;
  border-radius: 50%;
  width: 0.5rem;
  height: 0.5rem;
  margin: 0 0.25rem;
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${(props) => props.delay};
`;

export default function Loading() {
  return (
    <LoadingWrapper>
      <LoadingDiv>Loading</LoadingDiv>
      <Dot delay="0s" />
      <Dot delay="0.1s" />
      <Dot delay="0.2s" />
    </LoadingWrapper>
  );
}
