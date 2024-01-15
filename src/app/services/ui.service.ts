import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UIService {

  constructor(private snackBar: MatSnackBar) { }

  showStackBar(message: string, action: string, duration: number = 3000) {
    this.snackBar.open(message, action, { 
      horizontalPosition: 'end', 
      verticalPosition: 'bottom', 
      duration: duration,
    })
  }
}
