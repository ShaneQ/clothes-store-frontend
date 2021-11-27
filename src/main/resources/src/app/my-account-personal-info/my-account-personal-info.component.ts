import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PersonalInfoService} from "../personal-info.service";
import {PersonalInfo} from "../model/personalInfo";
import {Observable} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-my-account-personal-info',
  templateUrl: './my-account-personal-info.component.html',
  providers:[PersonalInfoService]
})
export class MyAccountPersonalInfoComponent implements OnInit {
  public personalInfo$: Observable<PersonalInfo>;
  public personalInfoForm: FormGroup
  public minDate : Date
  public maxDate : Date
  public submitted: boolean

  constructor(private fb: FormBuilder,private _app: PersonalInfoService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.minDate = new Date("January 1, 1970 01:15:00");
    this.maxDate = new Date("January 1, 2000 01:15:00");
    this.submitted = false
    this.personalInfo$ = this._app.getPersonalInfo()
    this.initializeEmptyForm()
    this.personalInfo$.subscribe(data => this.handleGetSuccess(data), error => this.handleError(error))
  }


  initializeEmptyForm(){
    this.personalInfoForm = this.fb.group({
      id: [''],
      firstName: ['Testing First', [Validators.required]],
      lastName: ['last', [Validators.required]],
      email: ['Testing', [Validators.required]],
      country: ['Testing', [Validators.required]],
      addressLineOne: ['Testing', [Validators.required]],
      addressLineTwo: ['Testing', [Validators.required]],
      city: ['Testing', [Validators.required]],
      eirCode: ['Testing', [Validators.required]],
      phone: ['0851231234', [Validators.required]],
      dateOfBirth: ['01/01/1990', Validators.required]
    })
  }
  initializeFilledForm(data: PersonalInfo){

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
      dateOfBirth: [date, Validators.required]
    })
  }
  get f() { return this.personalInfoForm.controls; }

  submit() {
    this.submitted = true
    console.log(this.personalInfoForm.controls.dateOfBirth.errors)

    if (this.personalInfoForm.invalid) {
      console.log('invalid');
      return;
    }
    let info: PersonalInfo;
    info = this.personalInfoForm.value;
    console.log(info)
    if(this.personalInfoForm.get("id").value){
      this._app.updatePersonalInfo(info)
    }else{
      this._app.createPersonalInfo(info)
    }
    console.log("Success")
  }

  onReset() {
    this.submitted = false;
    this.personalInfoForm.reset();
  }

  private handleError(error: any) {
    if (error.status = 404){
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 2000);
      this.initializeEmptyForm();
    }
  }

  private handleGetSuccess(data: PersonalInfo) {
    this.initializeFilledForm(data)
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
  }
}
