 import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CanAuthenticationGuard} from './app-auth.guard';
 import {ProductCreationComponent} from "./product-creation/product-creation.component";
 import {UsersComponent} from "./users/users.component";
 import {UserComponent} from "./user/user.component";
 import {BookingsComponent} from "./bookings/bookings.component";
 import {BookingComponent} from "./booking/booking.component";
 import {ProductsComponent} from "./products/products.component";
 import {AdminBaseComponent} from "./base/base.component";

const routes: Routes = [
  { path: 'base', component: AdminBaseComponent,
    canActivate: [CanAuthenticationGuard],
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
    ]}
    ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes as Routes)],
  exports: [],
  providers: [CanAuthenticationGuard]
})
export class AppRoutingModule { }
