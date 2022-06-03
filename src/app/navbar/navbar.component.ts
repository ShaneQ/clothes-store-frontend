import {Component, OnInit} from '@angular/core';
import {AppService} from '../services/app.service';
import {AuthService} from '../module-auth/auth.service';
import {Role} from "../module-auth/roles";
import {UsersService} from "../module-admin/services/users.service";
import {PersonalInfoService} from "../services/personal-info.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [AppService],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isLoggedIn: boolean;
  public isRegistrationPage: boolean;
  public isAdmin: boolean;
  public userStatus: string;

  constructor(
    private _service: AppService,
    private _authService: AuthService,
    private _userService: PersonalInfoService
  ) {
  }

  logout() {
    this._authService.logout();
  }

  ngOnInit(): void {
    this.isRegistrationPage = false;
    this._authService.isLoggedIn().then((result) => (this.isLoggedIn = result));
    this.isAdmin = this._authService.getUserRoles().includes(Role[Role.scc_admin_role]);
    this._userService.getPersonalInfo(true).subscribe(data => this.userStatus = data.status)
  }

  sortEvents(data) {
    if (data.toString() === 'REGISTRATION') {
      this.isRegistrationPage = true;
    }
  }
}
