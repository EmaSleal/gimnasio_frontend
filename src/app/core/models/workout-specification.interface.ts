import { Workout } from "./workout.interface";


export interface WorkoutSpecification {
  id: number;
  description: string;
  repsNumber: number;
  setsNumber: number;
  recommendedWeight: number;
  trainerRating: number;
  workout: Workout;
}