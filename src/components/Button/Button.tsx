import styled, { StyledComponentProps } from "styled-components";

interface ButtonProps
  extends StyledComponentProps<"button", any, { disabled?: boolean }, never> {
  primary?: boolean;
}

export const Button = styled.button<ButtonProps>`
  background: ${(props) => (props.primary ? "red" : "white")};
  color: ${(props) => (props.primary ? "white" : "red")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
`;
