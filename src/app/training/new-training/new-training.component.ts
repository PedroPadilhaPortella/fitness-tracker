import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent {

  @Output('start-training') startTraining = new EventEmitter<void>()

  onStartTraining() {
    this.startTraining.emit();
  }
}
