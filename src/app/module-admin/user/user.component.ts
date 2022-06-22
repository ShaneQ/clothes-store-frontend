import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../model/user';
import {UsersService} from '../services/users.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserSettings} from '../model/userSettings';
import {ToastService} from "../../module-common/toast.service";
import {memberships} from "../../model/arrays";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [UsersService],
})
export class UserComponent implements OnInit {
  public user: User;
  minDate: Date;
  maxDate: Date;
  public userSettingsForm: FormGroup;
  membershipTypes = this.getMembershipTypes();
  status = this.getStatus();

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UsersService,
    private formBuilder: FormBuilder,
    private _toastService: ToastService
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 180);
    this.initializeEmptyForm();
  }

  getMembershipTypes(): Array<any> {
    return memberships;
  }

  getStatus(): Array<any> {
    return [
      {name: 'Activated', value: 'ACTIVATED'},
      {name: 'Deactivated', value: 'DEACTIVATED'},
      {name: 'Blocked', value: 'BLOCKED'},
      {name: 'Requested', value: 'REQUESTED'},
    ];
  }

  initializeEmptyForm() {
    this.userSettingsForm = this.formBuilder.group({
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      membership: ['', Validators.required],
    });
  }

  initializePopulatedForm(user: User) {
    let selectedMembership = this.membershipTypes.find(
      (it) => it.value === user.membership
    );
    this.userSettingsForm = this.formBuilder.group({
      membership: [selectedMembership.value, Validators.required],
      status: [user.status, Validators.required],
      startDate: [user.startDate, Validators.required],
      endDate: [user.endDate, Validators.required],
    });
  }

  ngOnInit(): void {
    const userId = this._route.snapshot.paramMap.get('userId');
    this._userService.getUser(userId).subscribe((data) => {
      this.user = data;
      this.initializePopulatedForm(data);
    });
  }

  onSubmit() {
    let f = this.userSettingsForm.value as UserSettings;
    if (new Date(f.startDate).toLocaleDateString() !== 'Invalid Date') {
      f.startDate = new Date(f.startDate).toLocaleDateString('en-GB');
    }
    if (new Date(f.endDate).toLocaleDateString() !== 'Invalid Date') {
      f.endDate = new Date(f.endDate).toLocaleDateString('en-GB');
    }
    this._userService.updateSettings(this.user.id, f)
    .subscribe(data => this.showUpdateSuccessMessage(), error => {
      this.showUpdateErrorMessage()
    })
  }

  showUpdateSuccessMessage() {
    this._toastService.showSuccess("User updated successfully")
  }

  showUpdateErrorMessage() {
    this._toastService.showError("User update error occurred")
  }
}
