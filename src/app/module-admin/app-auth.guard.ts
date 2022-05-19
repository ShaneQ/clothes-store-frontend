import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import * as jwt_decode from 'jwt-decode';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CanAuthenticationGuard extends KeycloakAuthGuard implements CanActivate {
  constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
  }

  private baseUrl = environment.baseUrl

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let location = window.location.href;
    if (location === this.baseUrl){
      location = this.baseUrl+ 'base/bookings';
    }
    return new Promise((resolve, reject) => {
      console.log("HERE")
      if (!this.authenticated) {
        this.keycloakAngular.login({ redirectUri: location})
          .catch(e => console.error(e));
        return reject(false);
      }

      const requiredRoles: string[] = ["scc_admin_role"];
      if (!requiredRoles || requiredRoles.length === 0) {
        return resolve(true);
      } else {
        let hasRequiredRole = requiredRoles.every(role => this.roles.indexOf(role) > -1)

        if(!hasRequiredRole){
          this.keycloakAngular.logout(environment.baseUrl);
          this.router.navigate(['/'], {
            queryParams: {
              userMissingPrivilege: true
            }
          });
        }
        resolve(hasRequiredRole);
      }
    });
  }

  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch (Error){
      return null;
    }
  }

}
