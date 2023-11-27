import styled from "styled-components";

const StyledButton = styled.button`
  padding: 6px 10px;
  background: none;
  border: 1px solid #33333344;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #33333311;
  }
`;

interface ButtonProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
}

export const Button = ({ children, size, variant }: ButtonProps) => (
  <StyledButton>{children}</StyledButton>
);
