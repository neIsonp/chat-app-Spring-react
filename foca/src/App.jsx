import Button from "./components/Button";
import Input from "./components/Input";
import Lottie from 'react-lottie';
import animationData from './assets/ovni_animation.json';
import { MainContainer } from "./components/MainContainer";
import {WelcomeText} from "./components/WelcomeText";
import {InputContainer} from "./components/InputContainer";
import {ButtonContainer} from "./components/ButtonContainer";
import {HorizontalRule} from "./components/HorizontalRule";
import {Quote} from "./components/Quote";

function App() {

  const animationOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      <MainContainer>
        <WelcomeText>UfoChat</WelcomeText>
        <InputContainer>
          <Input type="text" placeholder="Email" />
          <Input type="password" placeholder="Password" />
        </InputContainer>
        <ButtonContainer>
          <Button content="Sign Up" />
        </ButtonContainer>
        <Quote>Desvende mistérios no UfoChat! </Quote>
        <HorizontalRule />
          <Lottie options={animationOptions} />
      </MainContainer>
    </>
  );
}



export default App;
