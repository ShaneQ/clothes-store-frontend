import {NgModule} from '@angular/core';
import {BookingsComponent} from './bookings/bookings.component';
import {ImageUploadComponent} from './image-upload/image-upload.component';
import {AdminNavbarComponent} from './navbar/admin-navbar.component';
import {ProductCreationComponent} from './product-creation/product-creation.component';
import {ProductsComponent} from './products/products.component';
import {UserComponent} from './user/user.component';
import {UsersComponent} from './users/users.component';
import {AdminBaseComponent} from './base/base.component';
import {BookingComponent} from './booking/booking.component';
import {RouterModule} from '@angular/router';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {IconsModule} from './icons/icons.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserModule} from '@angular/platform-browser';
import {AppAdminRoutingModule} from './app-admin-routing.module';
import {ProductDetailsAdminComponent} from './product-details-admin/product-details-admin.component';
import {ProductModule} from "../module-product/product.module";
import {ModuleCommonModule} from "../module-common/module-common.module";
import {ServiceInfoComponent} from "./service-info/service-info.component";

@NgModule({
  declarations: [
    AdminBaseComponent,
    BookingComponent,
    BookingsComponent,
    ImageUploadComponent,
    AdminNavbarComponent,
    ProductCreationComponent,
    ProductsComponent,
    UserComponent,
    UsersComponent,
    ProductDetailsAdminComponent,
    ServiceInfoComponent
  ],
  exports: [AdminNavbarComponent],
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
    DataTablesModule,
    AppAdminRoutingModule,
    ProductModule,
    FormsModule,
    ModuleCommonModule.forRoot()
  ],
})
export class AdminModule {
}
