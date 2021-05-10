import { Subject, Subscription } from "rxjs";

import { Exercise } from "./exercise.model";

import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { map } from 'rxjs/operators';

import { UIService } from "../shared/ui.service";

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    private fbSubs: Subscription[] = [];

    constructor(
        private db: AngularFirestore,
        private uiService: UIService
    ) { }

    fetchAvailableExercises(): void {
        this.uiService.loadingStateChanged.next(true);
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
                    this.uiService.loadingStateChanged.next(false);
                    this.availableExercises = result;
                    this.exercisesChanged.next([...this.availableExercises]);
                },
                error => {
                    console.log(error);
                    this.uiService.showSnackBar('Fetching Exercises failed, please try again later', null, 3000);
                    this.uiService.loadingStateChanged.next(false);
                    this.exerciseChanged.next(null);
                }
            )
        );
    }

    startExercise(selectedId: string): void {
        // this.db.doc('availableExercises/' + selectedId).update({ lastSelected: new Date() });
        // this.db.doc('availableExercises/' + selectedId).delete();
        this.runningExercise = this.availableExercises.find(
            ex => ex.id === selectedId
        );
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    completeExercise(): void {
        this.addDataToDatabase({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number): void {
        this.addDataToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise(): Exercise {
        return { ...this.runningExercise };
    }

    fetchCompletedOrCancelledExercises(): void {
        this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe(
            (result: Exercise[]) => {
                this.finishedExercisesChanged.next(result);
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