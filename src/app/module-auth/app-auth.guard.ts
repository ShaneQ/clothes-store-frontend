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
export class CanAuthenticationGuard extends KeycloakAuthGuard {
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

    // Get the roles required from the route.
    const requiredRoles = route.data.roles;

    // Allow the user to to proceed if no additional roles are required to access the route.
    if(this.roles.includes(Role[Role.scc_admin_role])){
      this.router.navigate(['admin/']).then()
    }
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }
    console.log(this.roles)
    if(this.roles.length === 3 && this.roles.includes("manage-account-links") && this.roles.includes("manage-account") && this.roles.includes("offline_access")){
      this.router.navigate(['/registration']).then()
    }

    // Allow the user to proceed if all the required roles are present.
    return requiredRoles.every((role) => this.roles.includes(role));
  }
}
