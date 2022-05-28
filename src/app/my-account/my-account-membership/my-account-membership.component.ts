import { Component, OnInit } from '@angular/core';
import { PersonalInfoService } from '../../services/personal-info.service';
import { Observable } from 'rxjs';
import { PersonalInfo } from '../../model/personalInfo';

@Component({
  selector: 'app-my-account-membership',
  templateUrl: './my-account-membership.component.html',
  providers: [PersonalInfoService],
})
export class MyAccountMembershipComponent implements OnInit {
  personalInfo: PersonalInfo;

  constructor(private _app: PersonalInfoService) {}

  ngOnInit(): void {
    this._app.getPersonalInfo().subscribe((data) => (this.personalInfo = data));
  }
  memberships = { 1: 'Casual', 2: 'Chic' };
  membershipsAllowance = { 1: '2 PIECES', 2: '8 PIECES' };
}
