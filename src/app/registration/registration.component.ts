import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../services/navbar.service";
import {AuthService} from "../module-auth/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  public isRegistered = false

  constructor(private _navBarService: NavbarService, private _authService: AuthService) {
  }

  ngOnInit(): void {
    //this._navBarService.navbarEvent.next("REGISTRATION")
  }

  registered(event: boolean) {

  }

  logout() {
    this._authService.logout()
  }
}
