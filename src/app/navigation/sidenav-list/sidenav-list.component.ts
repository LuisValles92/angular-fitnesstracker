import {
  Component,
  EventEmitter,
  // OnDestroy, 
  OnInit,
  Output
} from '@angular/core';

import {
  Observable,
  // Subscription
} from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

import { Store } from "@ngrx/store";
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit/*, OnDestroy*/ {
  @Output() sidenavClose = new EventEmitter<void>();
  // isAuth = false;
  isAuth$: Observable<boolean>;
  // authSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    /*
    this.authSubscription = this.authService.authChange.subscribe(
      authStatus => {
        this.isAuth = authStatus;
      }
    );
    */
  }

  onClose(): void {
    this.sidenavClose.emit();
  }

  onLogout(): void {
    this.onClose();
    this.authService.logout();
  }

  /*
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
  */
}
