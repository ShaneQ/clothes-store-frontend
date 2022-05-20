import {APP_INITIALIZER, NgModule} from '@angular/core';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {initializeKeycloak} from "./keycloak-init.factory";
import {CanAuthenticationGuard} from "./app-auth.guard";
import {AuthService} from "./auth.service";


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
export class AuthModule {
}
