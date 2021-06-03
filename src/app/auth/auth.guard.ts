import { Injectable } from "@angular/core";

import {
    ActivatedRouteSnapshot,
    CanLoad,
    // Router, 
    RouterStateSnapshot
} from "@angular/router";
import { Route } from "@angular/compiler/src/core";

// import { AuthService } from "./auth.service";

import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanLoad {
    constructor(
        // private authService: AuthService, 
        // private router: Router,
        private store: Store<fromRoot.State>
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.select(fromRoot.getIsAuth);
    }

    canLoad(route: Route): Observable<boolean> {
        /*
        console.log(route);
        console.log(this.authService.isAuth());
        if (this.authService.isAuth()) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }
        */
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }
}