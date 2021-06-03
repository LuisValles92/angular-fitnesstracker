import {
  Component,
  // OnDestroy, 
  OnInit
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Exercise } from '../exercise.model';

import { TrainingService } from '../training.service';
// import { UIService } from 'src/app/shared/ui.service';

import {
  Observable,
  // Subscription 
} from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit /* , OnDestroy*/ {
  /*
  exercises: Exercise[];
  private exerciseSubscription: Subscription;
  */
  exercises$: Observable<Exercise[]>;
  // private loadingSubscription: Subscription;
  // isLoading = true;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    // private uiService: UIService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    /*
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      result => {
        this.isLoading = result;
      }
    );
    */
    /*
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      result => {
        this.exercises = result;
      }
    );
    */
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
  }

  fetchExercises(): void {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }

  /*
  ngOnDestroy(): void {
    if (this.exerciseSubscription)
      this.exerciseSubscription.unsubscribe();
    if (this.loadingSubscription)
      this.loadingSubscription.unsubscribe();   
  }
  */

}
