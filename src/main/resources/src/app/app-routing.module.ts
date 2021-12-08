import {NgModule} from '@angular/core';
import {BaseComponent} from './base/base.component';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './pre-login/landing/landing.component';
import {ProductDetailsComponent} from './product/product-details/product-details.component';
import {ShopComponent} from './shop/shop.component';
import {CanAuthenticationGuard} from './app-auth.guard';
import {ContentComponent} from "./pre-login/content/content.component";
import {MyAccountBaseComponent} from "./my-account/my-account-base/my-account-base.component";
import {MyAccountOrdersComponent} from "./my-account/my-account-orders/my-account-orders.component";
import {MyAccountPersonalInfoComponent} from "./my-account/my-account-personal-info/my-account-personal-info.component";
import {RegistrationComponent} from "./registration/registration.component";
import {MyAccountMembershipComponent} from "./my-account/my-account-membership/my-account-membership.component";

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
    {
      path: 'registration-part-2',
      component: RegistrationComponent
    },
  ]},

  { path: 'base', component: BaseComponent,
    canActivate: [CanAuthenticationGuard],
    data: { roles: ['scc_user_role']},
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
          },
          {
            path: 'personal',
            component: MyAccountPersonalInfoComponent,
          },
          {
            path: 'membership',
            component: MyAccountMembershipComponent,
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
