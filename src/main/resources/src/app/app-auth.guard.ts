import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import * as jwt_decode from 'jwt-decode';
import {environment} from "../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class CanAuthenticationGuard extends KeycloakAuthGuard implements CanActivate {
  constructor(protected router: Router, protected keycloakAngular: KeycloakService, private _authService: AuthService) {
    super(router, keycloakAngular);
  }

  private baseUrl = environment.baseUrl

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let location = window.location.href;
    if (location === this.baseUrl){
      location = this.baseUrl+"/account";
    }
    return new Promise((resolve, reject) => {
      if (!this.authenticated) {
        this.keycloakAngular.login({scope: 'scc_user', redirectUri: location})
          .catch(e => console.error(e));
        return reject(false);
      }else{
        this._authService.setLogin()
      }
      console.log(this.roles)
      const requiredRoles: string[] = route.data.roles;
      if (!requiredRoles || requiredRoles.length === 0) {
        return resolve(true);
      } else {
        if (!this.roles || this.roles.length === 0) {
          resolve(false);
        }
        let hasRequiredRole = requiredRoles.every(role => this.roles.indexOf(role) > -1)
        let hasSCCUSerRole = this.roles.indexOf("scc_user_role")
        console.log(hasSCCUSerRole)
        if(hasSCCUSerRole == -1){
          this.router.navigate(['/registration-part-2'], {})
        }
        resolve(hasRequiredRole);
      }
    });
  }

  logout(){
    this._authService.logout(environment.baseUrl)
    this.router.navigate(['/'], {
      queryParams: {
        userMissingPrivilege: true
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
