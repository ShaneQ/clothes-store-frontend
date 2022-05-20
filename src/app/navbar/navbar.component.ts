import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { NavbarService } from '../services/navbar.service';
import { AuthService } from '../module-auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [AppService],
})
export class NavbarComponent implements OnInit {
  public isLoggedIn: boolean;
  public isRegistrationPage: boolean;
  public isAdmin: boolean;

  constructor(
    private _service: AppService,
    private _authService: AuthService
  ) {}

  logout() {
    this._authService.logout();
  }

  ngOnInit(): void {
    this.isRegistrationPage = false;
    this._authService.isLoggedIn().then((result) => (this.isLoggedIn = result));
    this.isAdmin = this._authService.getUserRoles().includes('scc_admin_role');
  }

  sortEvents(data) {
    if (data.toString() === 'REGISTRATION') {
      this.isRegistrationPage = true;
    }
  }
}
