import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { AuthService } from '../module-auth/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../module-admin/users.service';
import { PersonalInfoService } from '../services/personal-info.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {
  public isRegistered = false;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _users: PersonalInfoService
  ) {}

  registered(event: boolean) {
    this._router.navigate(['/browser']).then();
  }

  logout() {
    this._authService.logout();
  }

  ngOnInit(): void {
    if (this._users.isUserRegistered()) {
      this._router.navigate(['/shop']).then();
    }
  }
}
