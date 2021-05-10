import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AngularFireAuthModule } from "angularfire2/auth";

import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
    declarations: [
        SignupComponent,
        LoginComponent
    ],
    imports: [
        ReactiveFormsModule,
        SharedModule,
        AngularFireAuthModule
    ]
})
export class AuthModule { }