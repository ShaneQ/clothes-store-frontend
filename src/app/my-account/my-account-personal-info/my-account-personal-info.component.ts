import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PersonalInfoService} from '../../services/personal-info.service';
import {PersonalInfo} from '../../model/personalInfo';
import {Observable} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserInfo} from '../../model/userInfo';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../module-auth/auth.service';
import {Router} from "@angular/router";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-my-account-personal-info',
  templateUrl: './my-account-personal-info.component.html',
  providers: [PersonalInfoService, ToastService],
})
export class MyAccountPersonalInfoComponent implements OnInit {
  public personalInfo$: Observable<PersonalInfo>;
  public personalInfoForm: FormGroup;
  public minDate: Date;
  public maxDate: Date;
  public submitted: boolean;
  public saved: boolean;
  @Input()
  public isRegistrationPage: boolean;
  @Output('registrationSuccessful')
  public registrationSuccessful = new EventEmitter<boolean>();
  public created: boolean;
  public maxFieldLengthOne = 70;
  public maxFieldLengthTwo = 45;

  constructor(
    private fb: FormBuilder,
    private _app: PersonalInfoService,
    private spinner: NgxSpinnerService,
    private _authService: AuthService,
    private _router: Router,
    private _toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show().then();
    this.minDate = new Date('January 1, 1970 01:15:00');
    this.maxDate = new Date('January 1, 2005 01:15:00');
    this.submitted = false;
    this.saved = false;
    if (!this.isRegistrationPage) {
      this.personalInfo$ = this._app.getPersonalInfo();
      this.personalInfo$.subscribe((data) => this.handleGetSuccess(data));
    } else {
      this._app.hasUserRegistered().subscribe(
        () => this.registrationSuccessful.emit(true),
        (err) => this.onError(err)
      );
    }
    this.initializeEmptyForm(null);
  }

  onError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this._authService.logout();
    } else if (err.status === 404) {
      this._app
      .getKeycloakUserInfo()
      .subscribe((data) => this.initializeEmptyForm(data));
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 2000);
    }
  }

  initializeEmptyForm(keycloakInfo: UserInfo) {
    const date = new Date(1990, 1, 1);
    if (keycloakInfo) this.created = false;
    this.personalInfoForm = this.fb.group({
      id: [],
      firstName: this.getFirstNameControl(keycloakInfo?.firstName),
      lastName: this.getLastNameControl(keycloakInfo?.lastName),
      email: this.getEmailControl(keycloakInfo?.email),
      country: this.getCountryControl('Testing'),
      addressLineOne: this.getAddressLineOneControl('Testing'),
      addressLineTwo: this.getAddressLineTwoControl('Testing'),
      city: this.getCityControl('Testing'),
      eirCode: this.getEirCodeControl('Testing'),
      phone: this.getPhoneControl('0851231234'),
      dateOfBirth: this.getDOBControl(date),
      membership: [],
    });
  }

  getEirCodeControl(str: string) {
    return new FormControl(str, [Validators.required, Validators.maxLength(20)]);
  }

  getDOBControl(date: Date) {
    return new FormControl(date, [Validators.required]);
  }

  getPhoneControl(str: string) {
    return new FormControl(str, [Validators.required, Validators.minLength(10),
      Validators.maxLength(10), Validators.pattern('^[0-9]{10}')]);
  }

  getCityControl(str: string) {
    return new FormControl({value:"Dublin", disabled: true}, [Validators.required, Validators.maxLength(this.maxFieldLengthOne)])
  }

  getAddressLineOneControl(str: string) {
    return new FormControl(str, [Validators.required, Validators.maxLength(this.maxFieldLengthOne)])
  }

  getAddressLineTwoControl(str: string) {
    return new FormControl(str, [Validators.required, Validators.maxLength(this.maxFieldLengthOne)])
  }

  getCountryControl(str: string) {
    return new FormControl({value:"Ireland", disabled: true}, [Validators.required, Validators.maxLength(this.maxFieldLengthOne)])
  }

  getEmailControl(str: string) {
    return new FormControl({value:str, disabled: true}, [Validators.required, Validators.maxLength(this.maxFieldLengthOne)])
  }

  getFirstNameControl(str: string) {
    return new FormControl({value:str, disabled: true}, [Validators.required, Validators.maxLength(this.maxFieldLengthTwo)])
  }

  getLastNameControl(str: string) {
    return new FormControl({value:str, disabled: true}, [Validators.required, Validators.maxLength(this.maxFieldLengthTwo)])
  }

  getMembershipControl(num: number) {
    return new FormControl(num, [Validators.required])
  }

  initializeFilledForm(data: PersonalInfo) {
    this.created = true;
    const date = new Date(data.dateOfBirth);

    this.personalInfoForm = this.fb.group({
      id: [data.id],
      firstName: this.getFirstNameControl(data.firstName),
      lastName: this.getLastNameControl(data.lastName),
      email: this.getEmailControl(data.email),
      country: this.getCountryControl(data.country),
      addressLineOne: this.getAddressLineOneControl(data.country),
      addressLineTwo: this.getAddressLineTwoControl(data.country),
      city: this.getCityControl(data.city),
      eirCode: this.getEirCodeControl(data.eirCode),
      phone: this.getPhoneControl(data.phone),
      dateOfBirth: this.getDOBControl(date),
      membership: this.getMembershipControl(data.membership)
    });
  }

  get f() {
    return this.personalInfoForm.controls;
  }

  submit() {
    this.submitted = true;
    let membership = this.personalInfoForm.get('membership').value;
    if (this.personalInfoForm.invalid || membership === null) {
      return;
    }

    if (this.isRegistrationPage) {
      let info: PersonalInfo;
      info = this.personalInfoForm.value;
      this._app
      .createPersonalInfo(info)
      .subscribe((data) => {
        this.registrationSuccessful.emit(true);
        this._toastService.show('I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
      });
    } else {
      let info: PersonalInfo;
      info = this.personalInfoForm.value;
      if (this.personalInfoForm.get('id').value) {
        this._app
        .updatePersonalInfo(info)
        .subscribe((data) => (this.saved = true));
      } else {
        this._app
        .createPersonalInfo(info)
        .subscribe((data) => (this.saved = true));
      }
    }
  }

  onReset() {
    this.submitted = false;
    this.personalInfoForm.reset();
  }

  private handleGetSuccess(data: PersonalInfo) {
    if (this.isRegistrationPage) {
      this.registrationSuccessful.emit(true);
    } else {
      this.initializeFilledForm(data);
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1500);
    }
  }
}
