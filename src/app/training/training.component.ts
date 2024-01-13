import { TrainingService } from '../services/training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  
  onGoingTraining = false;
  exerciseSubscription!: Subscription;

  constructor(private trainingService: TrainingService) {  }
  
  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe((exercise) => {
      exercise ? this.onGoingTraining = true : this.onGoingTraining = false;
    })
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) this.exerciseSubscription.unsubscribe();
  }
}
