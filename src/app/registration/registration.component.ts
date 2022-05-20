import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../services/navbar.service";
import {AuthService} from "../module-auth/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {

  public isRegistered = false

  constructor(private _navBarService: NavbarService, private _authService: AuthService) {
  }

  registered(event: boolean) {

  }

  logout() {
    this._authService.logout()
  }
}
