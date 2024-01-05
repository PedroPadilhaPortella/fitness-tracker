import { Injectable } from '@angular/core';
import { Exercise } from '../interfaces/exercise.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private runningExercise: Exercise | null = null;
  private exercises: Exercise[] = [];

  exerciseChanged = new Subject<Exercise | null>();

  private avaliableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ]

  constructor() { }

  getAvaliableExercises() {
    return this.avaliableExercises.slice();
  }

  getRunningExercise() {
    return { ...this.runningExercise } as Exercise;
  }
  
  getCompletedOrCancelExercise() {
    return this.exercises.slice();
  }

  startExercise(id: string) {
    this.runningExercise = this.avaliableExercises.find((exercise) => exercise.id == id) || null;
    this.exerciseChanged.next({ ...this.runningExercise } as Exercise);
  }

  completeExercise() {
    this.exercises.push({ ...this.runningExercise, date: new Date(), state: 'completed'} as Exercise);
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({ 
      ...this.runningExercise, 
      date: new Date(), 
      duration: this.runningExercise!.duration * (progress / 100),
      calories: this.runningExercise!.calories * (progress / 100),
      state: 'cancelled'
    } as Exercise);
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
}
