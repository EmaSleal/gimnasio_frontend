import { WorkoutSpecification } from "./workout-specification.interface";


export interface DailyRoutine {
  id: number;
  days: string[];
  workoutSpecification: WorkoutSpecification[];
}