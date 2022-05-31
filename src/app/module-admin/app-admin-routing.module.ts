import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminBaseComponent} from './base/base.component';
import {ProductCreationComponent} from './product-creation/product-creation.component';
import {ProductsComponent} from './products/products.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './user/user.component';
import {BookingsComponent} from './bookings/bookings.component';
import {BookingComponent} from './booking/booking.component';
import {CanAuthenticationGuard} from '../module-auth/app-auth.guard';
import {CanAuthenticationAdminGuard} from "../module-auth/app-admin-auth.guard";
import {ProductDetailsAdminComponent} from "./product-details-admin/product-details-admin.component";
import {Role} from "../module-auth/roles";

const routes: Routes = [
  {
    path: 'admin',
    component: AdminBaseComponent,
    canActivate: [CanAuthenticationAdminGuard],
    data: {roles: [Role[Role.scc_admin_role]]},
    children: [
      {
        path: '',
        redirectTo: 'bookings',
        pathMatch: 'full',
      },
      {
        path: 'product',
        component: ProductCreationComponent,
      },
      {
        path: 'product/update/:productId',
        component: ProductCreationComponent,
      },
      {
        path: 'product/:productId',
        component: ProductDetailsAdminComponent,
      },
      {
        path: 'inventory',
        component: ProductsComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'user/:userId',
        component: UserComponent,
      },
      {
        path: 'bookings',
        component: BookingsComponent,
      },
      {
        path: 'booing/:bookingId',
        component: BookingComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes as Routes, {scrollPositionRestoration: 'enabled'})],
  exports: [],
  providers: [CanAuthenticationGuard],
})
export class AppAdminRoutingModule {
}
