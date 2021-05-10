import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";

import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from "../training/training.service";
import { UIService } from "../shared/ui.service";

@Injectable()
export class AuthService {
    private isAuthenticated: boolean = false;
    authChange = new Subject<boolean>();

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService
    ) { }

    initAuthListener(): void {
        this.afAuth.authState.subscribe(
            user => {
                if (user) {
                    this.isAuthenticated = true;
                    this.authChange.next(true);
                    this.router.navigate(['/training']);
                } else {
                    this.trainingService.cancelSubscriptions(); // Avoid the FirebaseError: Missing or insufficient permissions (.auth.signOut()).
                    this.authChange.next(false);
                    this.router.navigate(['/login']);
                    this.isAuthenticated = false;
                }
            }
        );
    }

    registerUser(authData: AuthData): void {
        this.uiService.loadingStateChanged.next(true); //Init loading
        this.afAuth.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                this.uiService.loadingStateChanged.next(false); //Finish loading
            })
            .catch(error => {
                console.log(error);
                this.uiService.loadingStateChanged.next(false); //Finish loading
                this.uiService.showSnackBar(error.message, null, 3000);
            });
    }

    login(authData: AuthData): void {
        this.uiService.loadingStateChanged.next(true); //Init loading
        this.afAuth.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                this.uiService.loadingStateChanged.next(false); //Finish loading
            })
            .catch(error => {
                console.log(error);
                this.uiService.loadingStateChanged.next(false); //Finish loading
                this.uiService.showSnackBar(error.message, null, 3000);
            });
    }

    logout(): void {
        this.afAuth.auth.signOut();
    }

    isAuth(): boolean {
        return this.isAuthenticated;
    }

}