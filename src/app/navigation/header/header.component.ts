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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit/*, OnDestroy*/ {
  @Output() sidenavToggle = new EventEmitter<void>();
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

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }

  /*
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
  */
}
