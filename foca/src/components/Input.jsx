import styled from "styled-components";

export default function Input({ type, placeholder }) {
  return <StyledInput type={type} placeholder={placeholder} />;
}

const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 10px;
  width: 80%;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 12px;

  &:focus {
    display: inline-block;
    border: 1px solid #ABC2FF;
    backdrop-filter: blur(12rem);
    
  }
  /* &::placeholder {
    color: #b9abe099;
    font-size: 1rem;
  } */
`;
