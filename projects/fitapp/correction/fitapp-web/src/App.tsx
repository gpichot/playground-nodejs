import { keepPreviousData, useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import { Badge } from "./components/Badge";
import ExerciseCard from "./components/ExerciseCard";
import { useQueryParams } from "./hooks/useQueryParams";
import { Exercise } from "./types";

const Muscles = [
  { label: "Pectoraux", value: "pectoraux" },
  { label: "Dos", value: "dos" },
  { label: "Ischios", value: "ischios" },
  { label: "Quadriceps", value: "quadriceps" },
  { label: "Mollets", value: "mollets" },
  { label: "Epaules", value: "epaules" },
  { label: "Biceps", value: "biceps" },
  { label: "Triceps", value: "triceps" },
  { label: "Abdominaux", value: "abdominaux" },
  { label: "Adducteurs", value: "adducteurs" },
  { label: "Fessiers", value: "fessiers" },
  { label: "Cardio", value: "cardio" },
];

const Main = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 1rem;
  justify-content: space-between;
  max-width: 1000px;
  margin: 0 auto;
`;

const BadgeList = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem;
`;

export default function App() {
  const [selectedMuscle, setSelectedMuscle] = useQueryParams("muscle");

  const exercisesQuery = useQuery({
    queryKey: ["exercises", { muscle: selectedMuscle ?? undefined }],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/exercises?muscle=${selectedMuscle}`
      );
      return (await response.json()) as Exercise[];
    },
    placeholderData: keepPreviousData,
  });

  if (exercisesQuery.isLoading) {
    return <>Chargement en cours</>;
  }
  if (exercisesQuery.isError) {
    return <>Une erreur est survenue</>;
  }
  const { data: exercises } = exercisesQuery;
  console.log(exercises);
  return (
    <Main>
      <BadgeList>
        {Muscles.map((muscle) => (
          <Badge
            key={muscle.value}
            style={{
              backgroundColor:
                muscle.value === selectedMuscle ? "#add8e644" : "transparent",
            }}
            onClick={() => {
              if (muscle.value === selectedMuscle) {
                setSelectedMuscle(null);
                return;
              }
              setSelectedMuscle(muscle.value);
            }}
          >
            {muscle.label}
          </Badge>
        ))}
      </BadgeList>
      {exercises?.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </Main>
  );
}
