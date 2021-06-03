import { Subscription } from "rxjs";

import { Exercise } from "./exercise.model";

import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { map } from 'rxjs/operators';

import { UIService } from "../shared/ui.service";

import { Store } from "@ngrx/store";
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import { take } from "rxjs/operators";

@Injectable()
export class TrainingService {
    private fbSubs: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private uiService: UIService,
        private store: Store<fromTraining.State>
    ) { }

    fetchAvailableExercises(): void {
        this.store.dispatch(new UI.StartLoading());
        this.fbSubs.push(this.db
            .collection('availableExercises')
            .snapshotChanges()
            .pipe(
                map(
                    docArray => {
                        // throw (new Error()); // run error
                        return docArray.map(doc => {
                            return {
                                id: doc.payload.doc.id,
                                ...(doc.payload.doc.data()) as Exercise
                            };
                        });
                    }
                )
            )
            .subscribe(
                (result: Exercise[]) => {
                    this.store.dispatch(new UI.StopLoading());
                    this.store.dispatch(new Training.SetAvailableTrainings(result));
                },
                error => {
                    console.log(error);
                    this.uiService.showSnackBar('Fetching Exercises failed, please try again later', null, 3000);
                    this.store.dispatch(new UI.StopLoading());
                }
            )
        );
    }

    startExercise(selectedId: string): void {
        this.store.dispatch(new Training.StartTraining(selectedId));
    }

    completeExercise(): void {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(
            ex => {
                this.addDataToDatabase({
                    ...ex,
                    date: new Date(),
                    state: 'completed'
                });
                this.store.dispatch(new Training.StopTraining());
            }
        );
    }

    cancelExercise(progress: number): void {
        this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(
            ex => {
                this.addDataToDatabase({
                    ...ex,
                    duration: ex.duration * (progress / 100),
                    calories: ex.calories * (progress / 100),
                    date: new Date(),
                    state: 'cancelled'
                });
                this.store.dispatch(new Training.StopTraining());
            }
        );
    }

    fetchCompletedOrCancelledExercises(): void {
        this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe(
            (result: Exercise[]) => {
                this.store.dispatch(new Training.SetFinishedTrainings(result));
            },
            error => console.log(error)
        ));
    }

    cancelSubscriptions(): void {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(exercise: Exercise): void {
        this.db.collection('finishedExercises').add(exercise);
    }

}