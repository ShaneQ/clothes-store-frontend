import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ProductListComponent} from './module-product/product-list/product-list.component';
import {ProductCardComponent} from './module-product/product-card/product-card.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {BaseComponent} from './base/base.component';
import {AppRoutingModule} from './app-routing.module';
import {FooterComponent} from './footer/footer.component';
import {NoPageFoundComponent} from './no-page-found/no-page-found.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ShopLoadMoreComponent} from './shop/shop-load-more/shop-load-more.component';
import {ShopComponent} from './shop/shop.component';
import {ShopFilterComponent} from './shop/shop-filter/shop-filter.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {KeycloakAngularModule} from 'keycloak-angular';
import {IconsModule} from './icons/icons.module';
import {MemberNotificationSlowDownComponent} from './modal/member-notification-slow-down/member-notification-slow-down.component';
import {BookingSummaryComponent} from './modal/booking-summary/booking-summary.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {ContentComponent} from './content/content.component';
import {MyAccountOrderComponent} from './my-account/my-account-order/my-account-order.component';
import {MyAccountBaseComponent} from './my-account/my-account-base/my-account-base.component';
import {MyAccountOrdersComponent} from './my-account/my-account-orders/my-account-orders.component';
import {MyAccountNavbarComponent} from './my-account/my-account-navbar/my-account-navbar.component';
import {MyAccountPersonalInfoComponent} from './my-account/my-account-personal-info/my-account-personal-info.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {RegistrationComponent} from './registration/registration.component';
import {MyAccountMembershipComponent} from './my-account/my-account-membership/my-account-membership.component';
import {HeadComponent} from './partials/head/head.component';
import {FaqComponent} from './faq/faq.component';
import {ContactComponent} from './contact/contact.component';
import {AboutComponent} from './about/about.component';
import {AuthModule} from './module-auth/auth.module';
import {AdminModule} from './module-admin/admin-module';
import {ProductModule} from "./module-product/product.module";
import {SwiperModule} from "swiper/angular";
import {RegistrationSuccessComponent} from './registration-success/registration-success.component';
import {ModuleCommonModule} from "./module-common/module-common.module";
import { SubscribeComponent } from './subscribe/subscribe.component';
import { JoinComponent } from './join/join.component';
import { SubscribeBarComponent } from './subscribe-bar/subscribe-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCardComponent,
    BaseComponent,
    FooterComponent,
    NoPageFoundComponent,
    NavbarComponent,
    HeadComponent,
    ShopLoadMoreComponent,
    ShopComponent,
    ShopFilterComponent,
    MemberNotificationSlowDownComponent,
    BookingSummaryComponent,
    ContentComponent,
    MyAccountOrderComponent,
    MyAccountBaseComponent,
    MyAccountOrdersComponent,
    MyAccountNavbarComponent,
    MyAccountPersonalInfoComponent,
    RegistrationComponent,
    MyAccountMembershipComponent,
    FaqComponent,
    ContactComponent,
    AboutComponent,
    RegistrationSuccessComponent,
    SubscribeComponent,
    JoinComponent,
    SubscribeBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxGalleryModule,
    RouterModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    KeycloakAngularModule,
    IconsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    NgxSpinnerModule,
    AdminModule,
    ProductModule,
    SwiperModule,
    ModuleCommonModule.forRoot(),
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
