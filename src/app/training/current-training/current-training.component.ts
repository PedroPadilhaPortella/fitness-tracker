import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../../services/training.service';
import * as fromTraining from '../../shared/training/training.reducer';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0
  timer: any;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe((exercise) => {
      const step = exercise!.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        }
      }, step);
    })
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, { data: { progress: this.progress } });
    dialogRef.afterClosed().subscribe((result) => {
      result ? this.trainingService.cancelExercise(this.progress) : this.startOrResumeTimer();
    });
  }
}
