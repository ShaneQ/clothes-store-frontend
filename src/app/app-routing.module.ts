import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentComponent} from './content/content.component';
import {MyAccountBaseComponent} from './my-account/my-account-base/my-account-base.component';
import {MyAccountOrdersComponent} from './my-account/my-account-orders/my-account-orders.component';
import {MyAccountPersonalInfoComponent} from './my-account/my-account-personal-info/my-account-personal-info.component';
import {RegistrationComponent} from './registration/registration.component';
import {MyAccountMembershipComponent} from './my-account/my-account-membership/my-account-membership.component';
import {FaqComponent} from './faq/faq.component';
import {ContactComponent} from './contact/contact.component';
import {AboutComponent} from './about/about.component';
import {CanAuthenticationGuard} from './module-auth/app-auth.guard';
import {RegistrationSuccessComponent} from "./registration-success/registration-success.component";
import {CanRegisterAuthenticationGuard} from "./module-auth/app-registration-auth.guard";
import {Role} from "./module-auth/roles";
import {NoPageFoundComponent} from "./no-page-found/no-page-found.component";
import {JoinComponent} from "./join/join.component";

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
  },
  {
    path: 'home',
    component: ContentComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'join',
    component: JoinComponent,
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
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [CanRegisterAuthenticationGuard],

  },
  {
    path: '404',
    component:NoPageFoundComponent
  },

  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full',
    component: NoPageFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes as Routes, {scrollPositionRestoration: 'enabled'})],
  exports: [],
  providers: [CanAuthenticationGuard],
})
export class AppRoutingModule {
}
