import {
  Component,
  // OnDestroy, 
  OnInit
} from '@angular/core';

import {
  Observable,
  // Subscription
} from 'rxjs';

// import { TrainingService } from './training.service';

import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit/* , OnDestroy */ {
  ongoingTraining = false;
  // exerciseSubscription: Subscription;
  ongoingTraining$: Observable<boolean>;

  constructor(
    // private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit(): void {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
    /*
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      exercise => {
        (exercise) ? this.ongoingTraining = true : this.ongoingTraining = false;
      }
    );
    */
  }

  /*
  ngOnDestroy(): void {
    if (this.exerciseSubscription)
      this.exerciseSubscription.unsubscribe();
  }
  */
}
