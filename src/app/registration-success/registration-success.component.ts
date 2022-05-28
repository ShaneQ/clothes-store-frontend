import { Component, OnInit } from '@angular/core';
import {AuthService} from "../module-auth/auth.service";

@Component({
  selector: 'app-registration-success',
  templateUrl: './registration-success.component.html'
})
export class RegistrationSuccessComponent implements OnInit {

  constructor(private _auth : AuthService) { }

  ngOnInit(): void {
  }

  refreshRoles() {
    this._auth.refreshAfterRolesChange();
  }
}
