import styled from 'styled-components'

export const  MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 30vw;
  height: 80vh;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;

  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;

    hr {
      margin-bottom: 0.3rem;
    }

    h4 {
      font-size: small;
    }
  }

  @media only screen and (min-width: 360px) {
    width: 83vw;
    height: 90vh;

    h4 {
      font-size: small;
    }
  }

  @media only screen and (min-width: 411px) {
    width: 83vw;
    height: 90vh;
  }

  @media only screen and (min-width: 768px) {
    width: 83vw;
    height: 80vh;
  }

  @media only screen and (min-width: 1024px) {
    width: 48vw;
    height: 90vh;

  }

  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 90vh;

  }

  @media only screen and (min-width: 1500px) {
    width: 32vw;
    height: 90vh;
  }
  
`;
