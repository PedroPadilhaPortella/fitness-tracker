import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

export enum LoadingStates {
  LOADING = 'loading',
  COMPLETED = 'completed',
  ERROR = 'error',
}

@Injectable({
  providedIn: 'root'
})
export class UIService {
  loadingStateChanged = new Subject<LoadingStates>();

  constructor(private snackBar: MatSnackBar) { }

  showStackBar(message: string, action: string, duration: number = 3000) {
    this.snackBar.open(message, action, { 
      horizontalPosition: 'end', 
      verticalPosition: 'bottom', 
      duration: duration,
    })
  }
}
