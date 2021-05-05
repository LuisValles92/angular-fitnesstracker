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
  progress: number = 0;
  timer: number;

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer(): void {
    const STEP = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.timer = window.setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, STEP);
  }

  onStop(): void {
    clearInterval(this.timer);
    const DIALOGREF = this.dialog.open(StopTrainingModalComponent, {
      data: {
        progressSpinner: this.progress
      }
    });
    DIALOGREF.afterClosed().subscribe(
      result => {
        // console.log(result);
        (result) ? this.trainingService.cancelExercise(this.progress) : this.startOrResumeTimer();
      }
    );
  }

}
