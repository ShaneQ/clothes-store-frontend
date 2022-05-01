import {EventEmitter, Injectable, Output} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Observable, of} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: Observable<boolean> = of(false);
  private membership: Observable<boolean> = of(false);
  private baseUrl = environment.baseUrl;

  @Output() loggedInEvent = new EventEmitter<boolean>();

  constructor(private _keycloak: KeycloakService) {
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.loggedIn
  }

  getMembershipStatus(): Observable<boolean> {
    return this.membership
  }

  setLogin() {
    this.loggedIn = of(true)
    console.log("LOGGED IN")
    this.loggedInEvent.emit(true)
  }

  setActiveMembership() {
    this.membership = of(true)
    console.log("ACTIVE MEMBERSHIP")
    this.loggedInEvent.emit(true)
  }

  logout(redirectUri: string) {
    this.loggedIn = of(false)
    this.membership = of(false)

    this.loggedInEvent.emit(false)
    this._keycloak.logout(redirectUri)
  }

  login() {
    let location = this.baseUrl + "/account";

    this._keycloak.login({scope: 'scc_user', redirectUri: location})
    .catch(e => console.error(e));
  }

  register() {
    this._keycloak.register()
  }
}
