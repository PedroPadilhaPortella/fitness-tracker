import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromRoot from "../../app.reducer";
import { Exercise } from "../../interfaces/exercise.interface";
import { SET_AVALIABLE_EXERCISES, SET_FINISHED_EXERCISES, START_EXERCISE, STOP_EXERCISE, TrainingActions } from "./training.actions";

export interface TrainingState {
  avaliableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise | null;
}

export interface State extends fromRoot.State {
  training: TrainingState
}

const initialState: TrainingState = {
  avaliableExercises: [],
  finishedExercises: [],
  activeTraining: null
}

export function trainingReducer(state: TrainingState = initialState, action: TrainingActions): TrainingState {
  switch (action.type) {
    case SET_AVALIABLE_EXERCISES:
      return { ...state, avaliableExercises: action.payload } 
      case SET_FINISHED_EXERCISES:
      return { ...state, finishedExercises: action.payload } 
      case START_EXERCISE:
      return { 
        ...state, 
        activeTraining: state.avaliableExercises.find((exercise) => exercise.id == action.payload) || null
      } 
      case STOP_EXERCISE:
      return { ...state, activeTraining: null }
    default:
      return state;
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training'); 

export const getAvaliableExercises = createSelector(
  getTrainingState, 
  (state: TrainingState) => state.avaliableExercises
);

export const getFinishedExercises = createSelector(
  getTrainingState, 
  (state: TrainingState) => state.finishedExercises
);

export const getActiveExercise = createSelector(
  getTrainingState, 
  (state: TrainingState) => state.activeTraining
);

export const getIsTraining = createSelector(
  getTrainingState, 
  (state: TrainingState) => state.activeTraining != null
);