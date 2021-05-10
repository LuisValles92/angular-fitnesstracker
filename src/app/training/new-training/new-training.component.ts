import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Exercise } from '../exercise.model';

import { TrainingService } from '../training.service';
import { UIService } from 'src/app/shared/ui.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  private exerciseSubscription: Subscription;
  private loadingSubscription: Subscription;
  isLoading = true;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) { }

  ngOnInit(): void {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      result => {
        this.isLoading = result;
      }
    );
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      result => {
        this.exercises = result;
      }
    );
    this.fetchExercises();
  }

  fetchExercises(): void {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription)
      this.exerciseSubscription.unsubscribe();
    if (this.loadingSubscription)
      this.loadingSubscription.unsubscribe();
  }

}
