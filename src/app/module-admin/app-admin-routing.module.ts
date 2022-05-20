import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminBaseComponent} from "./base/base.component";
import {ProductCreationComponent} from "./product-creation/product-creation.component";
import {ProductsComponent} from "./products/products.component";
import {UsersComponent} from "./users/users.component";
import {UserComponent} from "./user/user.component";
import {BookingsComponent} from "./bookings/bookings.component";
import {BookingComponent} from "./booking/booking.component";
import {CanAuthenticationGuard} from "../module-auth/app-auth.guard";

const routes: Routes = [
  {
    path: 'admin', component: AdminBaseComponent,
    canActivate: [CanAuthenticationGuard],
    data: {roles: ['scc_admin_role']},
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'product',
        component: ProductCreationComponent,
      },
      {
        path: 'product/:productId',
        component: ProductCreationComponent,
      },
      {
        path: 'inventory',
        component: ProductsComponent,
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'user/:userId',
        component: UserComponent,
      },
      {
        path: 'bookings',
        component: BookingsComponent
      },
      {
        path: 'booing/:bookingId',
        component: BookingComponent,
      },
      {
        path: 'products',
        component: ProductsComponent
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes as Routes)],
  exports: [],
  providers: [CanAuthenticationGuard]
})
export class AppAdminRoutingModule {
}