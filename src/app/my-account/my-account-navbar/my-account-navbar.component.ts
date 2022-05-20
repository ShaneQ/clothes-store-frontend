import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../module-auth/auth.service";

@Component({
  selector: 'app-my-account-navbar',
  templateUrl: './my-account-navbar.component.html'
})
export class MyAccountNavbarComponent {

  constructor(private _authService: AuthService) {
  }
  logout() {
    console.log('Logged Out');
    this._authService.logout();
  }

}
