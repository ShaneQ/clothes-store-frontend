import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {KeycloakService} from "keycloak-angular";
import {AuthService} from "../../auth.service";
import {AuthTwoService} from "../../../auth/service/auth-two.service";

@Component({
  selector: 'app-my-account-navbar',
  templateUrl: './my-account-navbar.component.html'
})
export class MyAccountNavbarComponent implements OnInit {

  constructor(private _authService: AuthTwoService) { }

  ngOnInit(): void {
  }

  logout() {
    console.log('Logged Out');
    this._authService.logout();
  }

}
