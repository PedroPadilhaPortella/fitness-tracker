import { Action } from "@ngrx/store";
import { Exercise } from "../../interfaces/exercise.interface";

export const SET_AVALIABLE_EXERCISES = '[Training] Set Avaliable Exercises';
export const SET_FINISHED_EXERCISES = '[Training] Set Finished Exercises';
export const START_EXERCISE = '[Training] Start Exercise';
export const STOP_EXERCISE = '[Training] Stop Exercise';

export class SetAvaliableExercises implements Action {
  readonly type = SET_AVALIABLE_EXERCISES;

  constructor(public payload: Exercise[]) { }
}

export class SetFinishedExercises implements Action {
  readonly type = SET_FINISHED_EXERCISES;

  constructor(public payload: Exercise[]) { }
}

export class StartExercise implements Action {
  readonly type = START_EXERCISE;

  constructor(public payload: string) { }
}

export class StopExercise implements Action {
  readonly type = STOP_EXERCISE;
}

export type TrainingActions = SetAvaliableExercises | SetFinishedExercises | StartExercise | StopExercise;