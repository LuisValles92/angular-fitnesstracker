import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";

import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
    private isAuthenticated: boolean = false;
    authChange = new Subject<boolean>();

    constructor(private router: Router, private afAuth: AngularFireAuth) { }

    registerUser(authData: AuthData): void {
        this.afAuth.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                this.authSuccessfully();
            })
            .catch(error => {
                console.log(error);
            });
    }

    login(authData: AuthData): void {
        this.afAuth.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                this.authSuccessfully();
            })
            .catch(error => {
                console.log(error);
            });
    }

    logout(): void {
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
    }

    isAuth(): boolean {
        return this.isAuthenticated;
    }

    private authSuccessfully(): void {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}