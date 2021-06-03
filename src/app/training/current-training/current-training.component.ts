import {
  Component,
  OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { TrainingService } from '../training.service';

import { StopTrainingModalComponent } from './stop-training-modal.component';

import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import { take } from "rxjs/operators";

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer(): void {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(
      ex => {
        const step = ex.duration / 100 * 1000;
        this.timer = window.setInterval(() => {
          this.progress += 1;
          if (this.progress >= 100) {
            this.trainingService.completeExercise();
            clearInterval(this.timer);
          }
        }, step);
      }
    );
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
