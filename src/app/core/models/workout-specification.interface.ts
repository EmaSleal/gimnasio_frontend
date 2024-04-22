import { Workout } from "./workout.interface";


export interface WorkoutSpecification {
  id: number;
  repsNumber: number;
  setsNumber: number;
  recommendedWeight: number;
  trainerRating: number;
  workout: Workout;
}