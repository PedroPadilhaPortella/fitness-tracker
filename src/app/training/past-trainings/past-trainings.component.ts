import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Exercise } from '../../interfaces/exercise.interface';
import { TrainingService } from '../../services/training.service';
import * as fromTraining from '../../shared/training/training.reducer';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private trainingService: TrainingService, 
    private store: Store<fromTraining.State>
  ) { }
  
  ngOnInit(): void {
    this.store.select(fromTraining.getFinishedExercises).subscribe((exercises) => {
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
}
