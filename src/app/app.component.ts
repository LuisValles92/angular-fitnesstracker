import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenavInput: MatSidenav;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.initAuthListener();
  }

  onToggle(): void {
    this.sidenavInput.toggle();
  }

}
