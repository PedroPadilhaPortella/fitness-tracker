import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, switchMap, take } from 'rxjs';
import * as fromTraining from '../shared/training/training.reducer';
import { Exercise } from '../interfaces/exercise.interface';
import * as UI from '../shared/ui/ui.actions';
import * as Training from '../shared/training/training.actions';
import { UIService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(
    private uiService: UIService,
    private store: Store<fromTraining.State>,
    private http: HttpClient,
  ) { }

  fetchAvaliableExercises() {
    this.store.dispatch(new UI.StartLoading());
    return this.http.get<Exercise[]>('http://localhost:3000/exercises').subscribe({
      next: (exercises) => {
        this.store.dispatch(new Training.SetAvaliableExercises(exercises));
        this.store.dispatch(new UI.StopLoading());
      },
      error: (error) => {
        this.uiService.showStackBar('Fetching Exercises Failed', 'Dismiss');
        this.store.dispatch(new UI.StopLoading());
      }
    })
  }

  fetchFinishedExercise() {
    return this.http.get<Exercise[]>('http://localhost:3000/finishedExercises').subscribe({
      next: (exercises) => {
        this.store.dispatch(new Training.SetFinishedExercises(exercises));
      },
      error: (error) => {
        this.uiService.showStackBar('Fetching Finished Exercises Failed', 'Dismiss');
      }
    })
  }

  startExercise(id: string) {
    this.store.dispatch(new Training.StartExercise(id));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveExercise).pipe(
      take(1),
      switchMap((runningExercise) => {
        const exercise = {
          ...runningExercise,
          id: new Date().getTime().toString(),
          date: new Date(),
          state: 'completed'
        } as Exercise;

        return this.saveExercise(exercise)
      })
    ).subscribe(() => {
      this.store.dispatch(new Training.StopExercise());
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveExercise).pipe(
      take(1),
      switchMap((runningExercise) => {
        console.log(runningExercise)
        const exercise = {
          ...runningExercise,
          id: new Date().getTime().toString(),
          date: new Date(),
          duration: runningExercise!.duration * (progress / 100),
          calories: runningExercise!.calories * (progress / 100),
          state: 'cancelled'
        } as Exercise;

        return this.saveExercise(exercise)
      })
    ).subscribe(() => {
      this.store.dispatch(new Training.StopExercise());
    });
  }

  private saveExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>('http://localhost:3000/finishedExercises', exercise);
  }
}
