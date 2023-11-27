import styled from "styled-components";

import { Exercise } from "@/types";

import { Button } from "./Button";
import { Card, CardDescription, CardHeader, CardTitle } from "./Card";

const Header = styled(CardHeader)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <Card>
      <Header>
        <div>
          <CardTitle>{exercise.nom}</CardTitle>
          <CardDescription>{exercise.description}</CardDescription>
        </div>
        <Button>Add to schedule</Button>
      </Header>
    </Card>
  );
}
