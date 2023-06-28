import Button from "./components/Button";
import Input from "./components/Input";
import Lottie from 'react-lottie';
import animationdata from './assets/animation/astro.json';
import spaceBackground from './assets/animation/space_bg.json';
import { MainContainer } from "./components/MainContainer";
import {WelcomeText} from "./components/WelcomeText";
import {InputContainer} from "./components/InputContainer";
import {ButtonContainer} from "./components/ButtonContainer";
import {HorizontalRule} from "./components/HorizontalRule";
import {Quote} from "./components/Quote";
import { BackgroundAnimation } from "./components/BackgroundAnimation";



function App() {

  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: animationdata,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const spaceBackgroundAnimation = {
    loop: true,
    autoplay: true,
    animationData: spaceBackground,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
    <BackgroundAnimation>
      <Lottie options={spaceBackgroundAnimation} />
    </BackgroundAnimation>
      <MainContainer>
        <WelcomeText>UfoChat</WelcomeText>
        <InputContainer>
          <Input type="text" placeholder="Email" />
          <Input type="password" placeholder="Password" />
        </InputContainer>
        <ButtonContainer>
          <Button content="Login" />
        </ButtonContainer>
        <Quote>Desvende mistérios no UfoChat!</Quote>
        <HorizontalRule />
          <Lottie options={animationOptions} />
      </MainContainer>
    </>
  );
}



export default App;
