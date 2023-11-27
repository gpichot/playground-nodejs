import styled from "styled-components";

const StyledCard = styled.div`
  width: 100%;
  max-width: 32rem;
  margin-top: 1rem;
  border: 1px solid #33333322;
  border-radius: 5px;
  padding: 1rem;
  box-shadow: 0 0 1px 2px #eeeeee;
`;

interface CardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => (
  <StyledCard>{children}</StyledCard>
);

export const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
`;

const StyledCardTitle = styled.h2`
  // Add styles for CardTitle
`;

interface CardTitleProps {
  children: React.ReactNode;
}

export const CardTitle = ({ children }: CardTitleProps) => (
  <StyledCardTitle>{children}</StyledCardTitle>
);

const StyledCardDescription = styled.p`
  // Add styles for CardDescription
`;

interface CardDescriptionProps {
  children: React.ReactNode;
}

export const CardDescription = ({ children }: CardDescriptionProps) => (
  <StyledCardDescription>{children}</StyledCardDescription>
);
