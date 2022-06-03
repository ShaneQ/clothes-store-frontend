import {Component} from '@angular/core';
import {AuthService} from "../module-auth/auth.service";

@Component({
  selector: 'app-registration-success',
  templateUrl: './registration-success.component.html'
})
export class RegistrationSuccessComponent {

  constructor(private _auth: AuthService) {
  }

  refreshRoles() {
    this._auth.refreshAfterRolesChange();
  }
}
