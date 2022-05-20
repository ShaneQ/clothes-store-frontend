import {Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';
import {AuthService} from "../../module-auth/auth.service";

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  providers: [AppService]
})
export class AdminNavbarComponent {


  constructor(
    private _service: AppService, private _authService: AuthService) {
  }

  logout() {
    this._authService.logout();
  }
}
