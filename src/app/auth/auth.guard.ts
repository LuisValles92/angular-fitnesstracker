import { Injectable } from "@angular/core";

import {
    ActivatedRouteSnapshot,
    CanLoad,
    RouterStateSnapshot
} from "@angular/router";
import { Route } from "@angular/compiler/src/core";

import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanLoad {
    constructor(
        private store: Store<fromRoot.State>
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.select(fromRoot.getIsAuth);
    }

    canLoad(route: Route): Observable<boolean> {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }

}