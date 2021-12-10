import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PersonalInfoService} from "../../personal-info.service";
import {PersonalInfo} from "../../model/personalInfo";
import {Observable} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {UserInfo} from "../../model/userInfo";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../auth.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-my-account-personal-info',
  templateUrl: './my-account-personal-info.component.html',
  providers: [PersonalInfoService]
})
export class MyAccountPersonalInfoComponent implements OnInit {
  public personalInfo$: Observable<PersonalInfo>;
  public personalInfoForm: FormGroup
  public minDate: Date
  public maxDate: Date
  public submitted: boolean
  public saved: boolean;
  @Input()
  public isRegistrationPage: boolean
  @Output('registrationSuccessful')
  public registrationSuccessful = new EventEmitter<boolean>();
  public created: boolean

  constructor(private fb: FormBuilder, private _app: PersonalInfoService, private spinner: NgxSpinnerService, private _authService: AuthService) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.minDate = new Date("January 1, 1970 01:15:00");
    this.maxDate = new Date("January 1, 2000 01:15:00");
    this.submitted = false
    this.saved = false
    if (!this.isRegistrationPage) {
      this.personalInfo$ = this._app.getPersonalInfo()
      this.personalInfo$.subscribe(data => this.handleGetSuccess(data))
    } else {
      this._app.hasUserRegistered().subscribe(() => this.registrationSuccessful.emit(true), err => this.onError(err))
    }
    this.initializeEmptyForm(null)
  }

  onError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this._authService.logout(environment.baseUrl)
    } else if (err.status === 404) {
      this._app.getKeycloakUserInfo().subscribe(data => this.initializeEmptyForm(data))
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 2000);
    }
  }


  initializeEmptyForm(keycloakInfo: UserInfo) {
    if (keycloakInfo)
      this.created = false
    this.personalInfoForm = this.fb.group({
      id: [],
      firstName: [keycloakInfo?.firstName, [Validators.required]],
      lastName: [keycloakInfo?.lastName, [Validators.required]],
      email: [keycloakInfo?.email, [Validators.required]],
      country: ['Testing', [Validators.required]],
      addressLineOne: ['Testing', [Validators.required]],
      addressLineTwo: ['Testing', [Validators.required]],
      city: ['Testing', [Validators.required]],
      eirCode: ['Testing', [Validators.required]],
      phone: ['0851231234', [Validators.required]],
      dateOfBirth: ['01/01/1990', Validators.required],
      membership: []
    })
  }

  initializeFilledForm(data: PersonalInfo) {
    this.created = true
    var date = new Date(data.dateOfBirth);


    this.personalInfoForm = this.fb.group({
      id: [data.id],
      firstName: [data.firstName, [Validators.required]],
      lastName: [data.lastName, [Validators.required]],
      email: [data.email, [Validators.required]],
      country: [data.country, [Validators.required]],
      addressLineOne: [data.addressLineOne, [Validators.required]],
      addressLineTwo: [data.addressLineTwo, [Validators.required]],
      city: [data.city, [Validators.required]],
      eirCode: [data.eirCode, [Validators.required]],
      phone: [data.phone, [Validators.required]],
      dateOfBirth: [date, Validators.required],
      membership: [1]
    })
  }

  get f() {
    return this.personalInfoForm.controls;
  }

  submit() {
    this.submitted = true
    let membership = this.personalInfoForm.get("membership").value
    if (this.personalInfoForm.invalid || membership === null) {
      return;
    }

    if (this.isRegistrationPage) {
      let info: PersonalInfo;
      info = this.personalInfoForm.value;
      this._app.createPersonalInfo(info).subscribe(data => this.registrationSuccessful.emit(true))
    } else {
      let info: PersonalInfo;
      info = this.personalInfoForm.value;
      if (this.personalInfoForm.get("id").value) {
        this._app.updatePersonalInfo(info).subscribe(data => this.saved = true)
      } else {
        this._app.createPersonalInfo(info).subscribe(data => this.saved = true)
      }
    }

  }

  onReset() {
    this.submitted = false;
    this.personalInfoForm.reset();
  }

  private handleGetSuccess(data: PersonalInfo) {
    if (this.isRegistrationPage) {
      this.registrationSuccessful.emit(true)
    } else {
      this.initializeFilledForm(data)
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 2000);
    }
  }
}
