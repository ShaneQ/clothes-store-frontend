import {Component, OnInit} from '@angular/core';
import {PersonalInfoService} from '../../services/personal-info.service';
import {PersonalInfo} from '../../model/personalInfo';
import {memberships} from "../../model/arrays";

@Component({
  selector: 'app-my-account-membership',
  templateUrl: './my-account-membership.component.html',
  providers: [PersonalInfoService],
})
export class MyAccountMembershipComponent implements OnInit {
  personalInfo: PersonalInfo;

  constructor(private _app: PersonalInfoService) {
  }

  ngOnInit(): void {
    this._app.getPersonalInfo().subscribe((data) => (this.personalInfo = data));
  }

  memberships = this.getMemberships();
  membershipsAllowance = {1: '4 PIECES', 2: '8 PIECES'};

  getMemberships() {
    return memberships;
  }
}
