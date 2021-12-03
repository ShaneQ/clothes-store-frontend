import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {KeycloakService} from "keycloak-angular";
import {NavbarService} from "../navbar.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  public isRegistered =false

  constructor(private _keycloak: KeycloakService, private _navBarService: NavbarService) { }

  ngOnInit(): void {
    this._navBarService.navbarEvent.next("REGISTRATION")
  }

  registered(event: boolean) {
    console.log("CAUGHT EMITTED EVENT")
    this.isRegistered = true
  }

  logout() {
    console.log('Logged Out');
    this._keycloak.logout(environment.baseUrl);
  }
}
