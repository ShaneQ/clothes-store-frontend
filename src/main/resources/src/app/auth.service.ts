import {EventEmitter, Injectable, Output} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Observable, of} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: Observable<boolean> = of(false)
  private baseUrl = environment.baseUrl


  @Output() loggedInEvent = new EventEmitter<boolean>();


  constructor(private _keycloak: KeycloakService) {
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.loggedIn
  }

  setLogin() {
    this.loggedIn = of(true)
    console.log("LOGGED IN")
    this.loggedInEvent.emit(true)
  }

  logout(redirectUri: string) {
    this.loggedIn = of(false)

    console.log("LOGGED OUT")
    this.loggedInEvent.emit(false)
    this._keycloak.logout(redirectUri)
  }

  login(){
    console.log("CLICKED LOGGING");
    let location = this.baseUrl+"/account";

    this._keycloak.login({scope: 'scc_user', redirectUri: location})
    .catch(e => console.error(e));
  }

  register() {
    this._keycloak.register()
  }
}
