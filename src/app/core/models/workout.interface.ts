
//interface for exercise model

import { MuscularGroup } from "./muscular-group.interface";

export interface Workout {
  id: number;
  name: string;
  muscularGroup: MuscularGroup;
  muscularLoad: string;
}
