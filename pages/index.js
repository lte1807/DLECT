import Link from "next/link";
import styled, { keyframes } from "styled-components";

function Home() {
  return (
    <Container>
      <Link href="/product">
        <LinkButton>
          <TextStyle>D.LECT</TextStyle>
          Design Select
        </LinkButton>
      </Link>
    </Container>
  );
}

export default Home;

const rotateAnimation = keyframes`
  0% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkButton = styled.div`
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
  animation: ${rotateAnimation} 1.4s linear infinite;
`;

const TextStyle = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
`;
