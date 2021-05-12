import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { TrainingService } from '../training.service';

import { StopTrainingModalComponent } from './stop-training-modal.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer(): void {
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.timer = window.setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop(): void {
    clearInterval(this.timer);
    const dialogref = this.dialog.open(StopTrainingModalComponent, {
      data: {
        progressSpinner: this.progress
      }
    });
    dialogref.afterClosed().subscribe(
      result => {
        // console.log(result);
        (result) ? this.trainingService.cancelExercise(this.progress) : this.startOrResumeTimer();
      }
    );
  }

}
