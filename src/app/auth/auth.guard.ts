import { Injectable } from "@angular/core";

import { CanLoad, Router } from "@angular/router";
import { Route } from "@angular/compiler/src/core";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanLoad {
    constructor(private authService: AuthService, private router: Router) { }

    canLoad(route: Route): boolean {
        console.log(route);
        console.log(this.authService.isAuth());
        if (this.authService.isAuth()) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
    }
}