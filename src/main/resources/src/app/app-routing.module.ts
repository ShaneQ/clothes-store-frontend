import {Component, NgModule} from '@angular/core';
import {BaseComponent} from './base/base.component';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './pre-login/landing/landing.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {HomeComponent} from './home/home.component';
import {ShopComponent} from './shop/shop.component';
import {CanAuthenticationGuard} from './app-auth.guard';
import {ProfileComponent} from './profile/profile.component';
import {ContentComponent} from "./pre-login/content/content.component";
import {MyAccountOrderComponent} from "./my-account-order/my-account-order.component";
import {MyAccountBaseComponent} from "./my-account-base/my-account-base.component";
import {MyAccountOrdersComponent} from "./my-account-orders/my-account-orders.component";

const routes: Routes = [
  { path: '', component: LandingComponent,
  children:[
    {
      path: '',
      component: ContentComponent,
    },
    {
      path: 'shop',
      component: ShopComponent,
      pathMatch: 'full'
    },
    {
      path: 'product/:productId',
      component: ProductDetailsComponent,
    },
  ]},
  { path: 'base', component: BaseComponent,
    canActivate: [CanAuthenticationGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'},

      {
        path: 'home',
        component: ContentComponent,
      },
      {
        path: 'shop',
        component: ShopComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'product/:productId',
        component: ProductDetailsComponent,
      },
      {
        path: 'account',
        component: MyAccountBaseComponent,
        children: [
          {
            path: '',
            redirectTo: 'orders',
            pathMatch: 'full'},

          {
            path: 'orders',
            component: MyAccountOrdersComponent,
          }
      ]
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
