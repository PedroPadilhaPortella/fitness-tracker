import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Exercise } from '../../interfaces/exercise.interface';
import { TrainingService } from '../../services/training.service';
import { LoadingStates, UIService } from '../../services/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[] = [];
  private exercisesSubscription!: Subscription;
  private loadingSubscription!: Subscription;
  loadingState: LoadingStates = LoadingStates.COMPLETED;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService,
  ) { }

  ngOnInit(): void {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe((loadingState) => {
      this.loadingState = loadingState;
    });

    this.exercisesSubscription = this.trainingService.exercisesChanged.subscribe((exercises) => {
      this.exercises = exercises;
    });
    
    this.fetchExercises();
  }
  
  fetchExercises() {
    this.trainingService.fetchAvaliableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exercisesSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
