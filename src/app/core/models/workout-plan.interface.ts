import { DailyRoutine } from "./daily-routine.interface";

export interface Routine {
  id: number;
  idUser: number;
  idTrainer: number;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: null;
  isTemplate: boolean;
  dailyRoutine: DailyRoutine[];
  

}



