import { Injectable } from '@angular/core';
import { Exercise } from '../interfaces/exercise.interface';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoadingStates, UIService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private avaliableExercises: Exercise[] = []
  private runningExercise: Exercise | null = null;

  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  constructor(
    private uiService: UIService,
    private http: HttpClient,
  ) { }

  fetchAvaliableExercises() {
    this.uiService.loadingStateChanged.next(LoadingStates.LOADING);
    return this.http.get<Exercise[]>('http://localhost:3000/exercises').subscribe({
      next: (exercises) => {
        this.avaliableExercises = exercises
        this.exercisesChanged.next([...this.avaliableExercises])
        this.uiService.loadingStateChanged.next(LoadingStates.COMPLETED);
      },
      error: (error) => {
        this.uiService.showStackBar('Fetching Exercises Failed', 'Dismiss');
        this.uiService.loadingStateChanged.next(LoadingStates.ERROR);
      }
    })
  }

  getRunningExercise() {
    return { ...this.runningExercise } as Exercise;
  }

  fetchFinishedExercise() {
    return this.http.get<Exercise[]>('http://localhost:3000/finishedExercises').subscribe({
      next: (exercises) => {
        this.finishedExercisesChanged.next(exercises)
      },
      error: (error) => {
        this.uiService.showStackBar('Fetching Finished Exercises Failed', 'Dismiss');
      }
    })
  }

  startExercise(id: string) {
    this.runningExercise = this.avaliableExercises.find((exercise) => exercise.id == id) || null;
    this.exerciseChanged.next({ ...this.runningExercise } as Exercise);
  }

  completeExercise() {
    const exercise = {
      ...this.runningExercise,
      id: new Date().getTime().toString(),
      date: new Date(),
      state: 'completed'
    } as Exercise;

    this.saveExercise(exercise).subscribe((response) => {
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    });
  }

  cancelExercise(progress: number) {
    const exercise = {
      ...this.runningExercise,
      id: new Date().getTime().toString(),
      date: new Date(),
      duration: this.runningExercise!.duration * (progress / 100),
      calories: this.runningExercise!.calories * (progress / 100),
      state: 'cancelled'
    } as Exercise;

    this.saveExercise(exercise).subscribe((response) => {
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    });
  }

  private saveExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>('http://localhost:3000/finishedExercises', exercise);
  }
}
