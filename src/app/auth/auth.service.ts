import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

// import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";

import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from "../training/training.service";
import { UIService } from "../shared/ui.service";

import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

import * as Auth from './auth.actions';

@Injectable()
export class AuthService {
    /*
    private isAuthenticated = false;
    authChange = new Subject<boolean>();
    */

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
        private store: Store<fromRoot.State>
    ) { }

    initAuthListener(): void {
        this.afAuth.authState.subscribe(
            user => {
                if (user) {
                    /*
                    this.isAuthenticated = true;
                    this.authChange.next(true);
                    */
                    this.store.dispatch(new Auth.SetAuthenticated());
                    this.router.navigate(['/training']);
                } else {
                    this.trainingService.cancelSubscriptions(); // Avoid the FirebaseError: Missing or insufficient permissions (.auth.signOut()).
                    /*
                    this.isAuthenticated = false;
                    this.authChange.next(false);
                    */
                    this.store.dispatch(new Auth.SetUnauthenticated());
                    this.router.navigate(['/login']);
                }
            }
        );
    }

    registerUser(authData: AuthData): void {
        // this.uiService.loadingStateChanged.next(true); //Init loading
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                // this.uiService.loadingStateChanged.next(false); //Finish loading
                this.store.dispatch(new UI.StopLoading());
            })
            .catch(error => {
                console.log(error);
                // this.uiService.loadingStateChanged.next(false); //Finish loading
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackBar(error.message, null, 3000);
            });
    }

    login(authData: AuthData): void {
        // this.uiService.loadingStateChanged.next(true); //Init loading
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                // this.uiService.loadingStateChanged.next(false); //Finish loading
                this.store.dispatch(new UI.StopLoading());
            })
            .catch(error => {
                console.log(error);
                // this.uiService.loadingStateChanged.next(false); //Finish loading
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackBar(error.message, null, 3000);
            });
    }

    logout(): void {
        this.afAuth.auth.signOut();
    }

    /*
    isAuth(): boolean {
        return this.isAuthenticated;
    }
    */
}