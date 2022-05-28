import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import {Role} from "./roles";

@Injectable({
  providedIn: 'root',
})
export class CanRegisterAuthenticationGuard extends KeycloakAuthGuard {
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        scope: 'scc_user',
        redirectUri: window.location.origin + state.url,
      });
    }
    if(this.roles.includes(Role[Role.scc_user_role]) || this.roles.includes(Role[Role.scc_admin_role])) {
      this.router.navigate(["/browser"]).then();
    }
    return true

  }
}
