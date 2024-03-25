
//interface for exercise model

import { MuscularGroup } from "./muscular-group.interface";

export interface Exercise {
  id: number;
  name: string;
  muscularGroup: MuscularGroup;
  muscularLoad: string;
  exerciseSpecified: [];
  routineDay: [];
  createdAt: Date;
  updatedAt: Date;
}