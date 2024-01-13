import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../../interfaces/exercise.interface';
import { TrainingService } from '../../services/training.service';
import { MatSort } from '@angular/material/sort';
import { NgModel } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  finishedExercisesSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private trainingService: TrainingService) { }
  
  ngOnInit(): void {
    this.finishedExercisesSubscription = this.trainingService.finishedExercisesChanged
      .subscribe((exercises) => {
        this.dataSource.data = exercises
      });

    this.trainingService.fetchFinishedExercise();
  }
  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  search(input: NgModel) {
    this.dataSource.filter = input.control.value.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    if (this.finishedExercisesSubscription) this.finishedExercisesSubscription.unsubscribe();
  }
}
