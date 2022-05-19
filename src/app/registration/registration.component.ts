import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {KeycloakService} from "keycloak-angular";
import {NavbarService} from "../services/navbar.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  public isRegistered =false

  constructor(private _keycloak: KeycloakService, private _navBarService: NavbarService, private _authService: AuthService) { }

  ngOnInit(): void {
    this._navBarService.navbarEvent.next("REGISTRATION")
  }

  registered(event: boolean) {
    console.log("CAUGHT EMITTED EVENT")
    this.isRegistered = true
    if(this.isRegistered){
      //this._authService.login()
    }
  }

  logout() {
    this._authService.logout(environment.baseUrl)
  }
}
