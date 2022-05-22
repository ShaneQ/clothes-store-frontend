import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './module-product/product-details/product-details.component';
import { ShopComponent } from './shop/shop.component';
import { ContentComponent } from './content/content.component';
import { MyAccountBaseComponent } from './my-account/my-account-base/my-account-base.component';
import { MyAccountOrdersComponent } from './my-account/my-account-orders/my-account-orders.component';
import { MyAccountPersonalInfoComponent } from './my-account/my-account-personal-info/my-account-personal-info.component';
import { RegistrationComponent } from './registration/registration.component';
import { MyAccountMembershipComponent } from './my-account/my-account-membership/my-account-membership.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { CanAuthenticationGuard } from './module-auth/app-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
  },
  {
    path: 'registration-part-2',
    component: RegistrationComponent,
  },
  {
    path: 'shop',
    component: ShopComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'browser',
    canActivate: [CanAuthenticationGuard],
    component: ShopComponent,
    data: { roles: ['scc_user_role'] },
  },
  {
    path: 'product/:productId',
    component: ProductDetailsComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'account',
    component: MyAccountBaseComponent,
    canActivate: [CanAuthenticationGuard],
    data: { roles: ['scc_user_role'] },
    children: [
      {
        path: '',
        redirectTo: 'orders',
        pathMatch: 'full',
      },

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
      },
    ],
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes as Routes)],
  exports: [],
  providers: [CanAuthenticationGuard],
})
export class AppRoutingModule {}
