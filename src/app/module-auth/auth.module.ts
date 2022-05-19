import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {initializeKeycloak} from "../init/keycloak-init.factory";
import {AuthService} from "../services/auth.service";
import {CanAuthenticationGuard} from "../app-auth.guard";



@NgModule({
  declarations: [],
  imports: [
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    AuthService,
    CanAuthenticationGuard
  ],
})
export class AuthModule { }
