import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  providers: [AppService]
})
export class AdminHeaderComponent implements OnInit {

  public isLoggedIn = false;

  constructor(
    private _service: AppService){}

  logout() {
    console.log('Logged Out');
    this._service.logout();
  }

  ngOnInit(): void {
    console.log('Landed on base page');
    const bool = this._service.checkCredentials();
    console.log(bool);
  }

}
