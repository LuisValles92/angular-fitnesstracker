import {
  Component,
  OnInit
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

import {
  Observable,
} from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  hide = true;
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // Chequea que Datepicker sea mayor de edad
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm): void {
    // console.log(form);
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
