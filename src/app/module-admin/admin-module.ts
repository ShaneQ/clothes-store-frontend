import { NgModule } from '@angular/core';
import {BookingsComponent} from "./bookings/bookings.component";
import {AdminHeaderComponent} from "./header/admin-header.component";
import {ImageUploadComponent} from "./image-upload/image-upload.component";
import {AdminNavbarComponent} from "./navbar/admin-navbar.component";
import {ProductCreationComponent} from "./product-creation/product-creation.component";
import {ProductsComponent} from "./products/products.component";
import {UserComponent} from "./user/user.component";
import {UsersComponent} from "./users/users.component";
import {AdminBaseComponent} from "./base/base.component";
import {BookingComponent} from "./booking/booking.component";
import {RouterModule} from "@angular/router";
import {DataTablesModule} from "angular-datatables";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BsDatepickerModule, DatepickerModule} from "ngx-bootstrap/datepicker";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {IconsModule} from "./icons/icons.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserModule} from "@angular/platform-browser";
import {AppAdminRoutingModule} from "./app-admin-routing.module";



@NgModule({
  declarations: [
    AdminBaseComponent,
    BookingComponent,
    BookingsComponent,
    AdminHeaderComponent,
    ImageUploadComponent,
    AdminNavbarComponent,
    ProductCreationComponent,
    ProductsComponent,
    UserComponent,
    UsersComponent
  ],
  exports: [
    AdminHeaderComponent,
    AdminNavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    IconsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DatepickerModule,
    DataTablesModule,
    AppAdminRoutingModule
  ]
})
export class AdminModule { }
