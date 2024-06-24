
//interface for exercise model

import { MuscularGroup } from "./muscular-group.interface";

export interface Workout {
  id?: string;
  name?: string;
  muscularGroup: MuscularGroup;
  muscularLoad?: string;
}
